const userService = require("../services/user.service");
const { ErrorHandler } = require("../helpers/error");
const { hashPassword } = require("../helpers/hashPassword");

const getAllUsers = async (req, res) => {
  const results = await userService.getAllUsers();
  res.status(200).json(results);
};

const createUser = async (req, res) => {
  const { name, password, email } = req.body;
  const hashedPassword = hashPassword(password);

  const user = await userService.createUser({
    name,
    email,
    hashedPassword,
  });

  res.status(201).json({
    status: "success",
    user,
  });
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userService.getUserById(id);
    return res.status(200).json(user);
  } catch (error) {
    throw new ErrorHandler(error.statusCode, "User not found");
  }
};

const getUserProfile = async (req, res) => {
  const { id } = req.user;

  const user = await userService.getUserById(id);

  return res.status(200).json(user);
};

const updateUser = async (req, res) => {
  const { email, address, city, state, country } = req.body;
  try {
    const results = await userService.updateUser({
      name,
      email,
      phone_number,
      address,
      city,
      state,
      zip_code,
      country,
      id: req.params.id,
    });
    return res.status(201).json(results);
  } catch (error) {
    throw new ErrorHandler(error.statusCode, error.message);
  }
};
