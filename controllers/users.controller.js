const userService = require("../services/user.service");
const { ErrorHandler } = require("../helpers/error");
const { hashPassword } = require("../helpers/hashPassword");

const getAllUsers = async (req, res) => {
  try {
    const results = await userService.getAllUsers();
    res.status(200).json(results);
  } catch {
    res.status(500).json(error);
  }
};

const createUser = async (req, res) => {
  try {
    const { name, password, email } = req.body;
    const hashedPassword = await hashPassword(password);

    const user = await userService.createUser({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      status: "success",
      user,
    });
  } catch {
    res.status(500).json(error);
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userService.getUserById(id);
    return res.status(200).json(user);
  } catch (error) {
    // throw new ErrorHandler(error.statusCode, "User not found");
    res.status(500).json(error);
  }
};

const getUserProfile = async (req, res) => {
  try {
    const { id } = req.body.user;

    const user = await userService.getUserById(id);

    return res.status(200).json(user);
  } catch {
    res.status(500).json(error);
  }
};

const updateUser = async (req, res) => {
  const { name, email, phone_number, address, city, state, zip_code, country } =
    req.body;
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
    // throw new ErrorHandler(error.statusCode, error.message);
    res.status(500).json(error);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await userService.deleteUser(id);
    res.status(200).json(result);
  } catch (error) {
    // throw new ErrorHandler(error.statusCode, error.message);
    res.status(500).json(error);
  }
};

// const changeUserPassword = async (req, res) => {
//   const { id } = req.params;
//   const user = await getUserById(id);
// };

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getUserProfile,
};
