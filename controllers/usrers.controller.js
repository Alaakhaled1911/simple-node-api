const asyncWrapper = require("../middleware/asyncWrapper");
const User = require("../Model/users.model");
const httpStatus = require("../utils/httpStatusText");
const AppError = require("../utils/AppError");
const bcrypt = require("bcryptjs");
const generateJWT = require("../utils/generateJWT");
const getAllUsers = asyncWrapper(async (req, res) => {
  console.log(req.headers);

  const query = req.query;
  const limit = parseInt(query.limit, 10) || 10; // Default limit to 10
  const page = parseInt(query.page, 10) || 1; // Default page to 1
  const skip = (page - 1) * limit;

  const users = await User.find({}, { __v: false, password: false })
    .limit(limit)
    .skip(skip);

  const usersWithoutToken = users.map((user) => {
    const userObject = user.toObject();
    delete userObject.token;
    return userObject;
  });

  res.json({
    status: httpStatus.SUCCESS,
    data: {
      users: usersWithoutToken,
    },
  });
});

const registerUsers = asyncWrapper(async (req, res, next) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const oldUser = await User.findOne({ email });
  if (oldUser) {
    return next(new AppError("User already exists", 400, "fail"));
  }

  const newUser = new User({ name, email, password: hashedPassword });
  // Generate a token
  const token = await generateJWT({ id: newUser._id, email: newUser.email });

  await newUser.save();

  const registeruserWithoutToken = newUser.toObject();
  delete registeruserWithoutToken.password;
  delete registeruserWithoutToken.token;

  res.status(201).json({
    status: httpStatus.SUCCESS,
    data: { user: registeruserWithoutToken, token },
  });
});

const loginUsers = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new AppError("Please provide email and password", 400, httpStatus.FAIL)
    );
  }

  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError("User not found", 401, httpStatus.FAIL));
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new AppError("Incorrect password", 401, httpStatus.FAIL));
  }

  const token = await generateJWT({ id: user._id, email: user.email });

  const userWithoutToken = user.toObject();
  delete userWithoutToken.password;
  delete userWithoutToken.token;

  return res.status(200).json({
    status: httpStatus.SUCCESS,
    message: "Login successful",
    data: {
      user: userWithoutToken,
      token,
    },
  });
});

module.exports = {
  getAllUsers,
  registerUsers,
  loginUsers,
};
