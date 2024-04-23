require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  isValidTokenDb,
  createResetTokenDb,
  setTokenStatusDb,
  deleteResetTokenDb,
} = require("../db/auth.db");

const validateUser = require("../helpers/validateUser");
const { ErrorHandler } = require("../helpers/error");
const { changeUserPasswordDb } = require("../db/user.db");
const { getUserByEmailDb, createUserDb } = require("../db/user.db");
const { createCartDb } = require("../db/cart.db");
const crypto = require("crypto");
const moment = require("moment");
let curDate = moment().format();

class AuthService {
  async signUp(user) {
    try {
      const { password, email, name } = user;
      if (!email || !password || !name) {
        throw new ErrorHandler(401, "All fields required!");
      }
      if (validateUser(email, password)) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const userByEmail = await getUserByEmailDb(email);

        if (userByEmail) {
          throw new ErrorHandler(401, "Email Already Taken");
        }

        const newUser = await createUserDb({
          ...user,
          password: hashedPassword,
        });

        const { id: cart_id } = await createCartDb(newUser.id);

        const token = await this.signToken({
          id: newUser.id,
          cart_id,
        });

        const refreshToken = await this.signRefreshToken({
          id: newUser.id,
          cart_id,
        });
        return {
          token,
          refreshToken,
          user: {
            user_id: newUser.id,
            fullname: newUser.name,
            email: newUser.email,
            cart_id,
          },
        };
      } else {
        throw new ErrorHandler(401, "Input validation error");
      }
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  async login({ email, password }) {
    try {
      // if (!validateUser(email, password)) {
      //   throw new ErrorHandler(403, "Invalid login");
      // }

      const user = await getUserByEmailDb(email);
      console.log(user);
      if (!user) {
        throw new ErrorHandler(403, "User Does Not Exist");
      }

      // if (user.google_id && !user.password) {
      //   throw new ErrorHandler(403, "Login in with Google");
      // }

      const { password: dbPassword, id, cart_id, name: fullname } = user;
      const isCorrectPassword = await bcrypt.compare(password, dbPassword);

      if (!isCorrectPassword) {
        throw new ErrorHandler(403, "Email or password incorrect.");
      }

      const token = await this.signToken({ id, cart_id });
      const refreshToken = await this.signRefreshToken({
        id,
        cart_id,
      });
      return {
        token,
        refreshToken,
        user: {
          id,
          fullname,
          cart_id,
        },
      };
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }
  async generateRefreshToken(data) {
    const payload = await this.verifyRefreshToken(data);

    const token = await this.signToken(payload);
    const refreshToken = await this.signRefreshToken(payload);

    return {
      token,
      refreshToken,
    };
  }

  async forgotPassword(email) {
    const user = await getUserByEmailDb(email);

    if (user) {
      try {
        await setTokenStatusDb(email);

        //Create a random reset token
        var fpSalt = crypto.randomBytes(64).toString("base64");

        //token expires after one hour
        var expireDate = moment().add(1, "h").format();

        await createResetTokenDb({ email, expireDate, fpSalt });
        return fpSalt;

        // await mail.forgotPasswordMail(fpSalt, email); ❌
      } catch (error) {
        throw new ErrorHandler(error.statusCode, error.message);
      }
    } else {
      throw new ErrorHandler(400, "Email not found");
    }
  }

  async verifyResetToken(token, email) {
    try {
      await deleteResetTokenDb(curDate);
      const isTokenValid = await isValidTokenDb({
        token,
        email,
        curDate,
      });

      return isTokenValid;
    } catch (error) {
      console.warn(curDate);
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }

  async resetPassword(password, password2, token, email) {
    const isValidPassword =
      typeof password === "string" && password.trim().length >= 6;

    if (password !== password2) {
      throw new ErrorHandler(400, "Password do not match.");
    }

    if (!isValidPassword) {
      throw new ErrorHandler(
        400,
        "Password length must be at least 6 characters"
      );
    }

    try {
      const isTokenValid = await isValidTokenDb({
        token,
        email,
        curDate,
      });

      if (!isTokenValid)
        throw new ErrorHandler(
          400,
          "Token not found. Please try the reset password process again."
        );

      await setTokenStatusDb(email);

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      await changeUserPasswordDb(hashedPassword, email);
      //   await mail.resetPasswordMail(email); ❌
    } catch (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
  }
  async signToken(data) {
    try {
      return jwt.sign(data, process.env.SECRET, { expiresIn: "1h" });
    } catch (error) {
      console.error(error);
      throw new ErrorHandler(500, "An error occurred");
    }
  }

  async signRefreshToken(data) {
    try {
      return jwt.sign(data, process.env.REFRESH_SECRET, { expiresIn: "1h" });
    } catch (error) {
      console.error(error);
      throw new ErrorHandler(500, error.message);
    }
  }

  async verifyRefreshToken(token) {
    try {
      const payload = jwt.verify(token, process.env.REFRESH_SECRET);
      return {
        id: payload.id,
        cart_id: payload.cart_id,
      };
    } catch (error) {
      console.error(error);
      throw new ErrorHandler(500, error.message);
    }
  }
}

module.exports = new AuthService();
