const User = require('../models/user_model');
const validator = require('validator');
const jwt_generat = require('../utility/jwt_generat');
const httpStatus = require("../utility/https_status");
const asyncWrapper = require('../middleware/asyncWrapper');

const signup = asyncWrapper(
  async (req, res, next) => {
    try {
      // Validate data
      const { firstName, lastName, email, password, role } = req.body;



      // Check if all required fields are provided
      if (!firstName || !lastName || !email || !password) {
        const error = AppError.create('Please provide all required fields', 400, httpStatus.FAIL)
        return next(error);

      }

      // Validate firstName
      if (firstName.trim().length === 0) {
        const error = AppError.create('firstName cannot be empty', 400, httpStatus.FAIL)
        return next(error);
      }
      if (lastName.trim().length === 0) {
        const error = AppError.create('lastName cannot be empty', 400, httpStatus.FAIL)
        return next(error);
      }
      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        const error = AppError.create('Invalid email format', 400, httpStatus.FAIL)
        return next(error);
      }

      // Validate password
      if (password.length < 8) {
        const error = AppError.create('Password should be at least 8 characters long', 400, httpStatus.FAIL)
        return next(error);
      }
      if (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
        const error = AppError.create('Password should contain both letters and numbers', 400, httpStatus.FAIL)
        return next(error);
      }

      // Check if email is unique
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        const error = AppError.create('Email already exists', 400, httpStatus.FAIL)
        return next(error);
      }

      // Create a new user
      const newUser = new User({
        firstName,
        lastName,
        email,
        password,
        role
      })

      const token = await jwt_generat({ email: newUser.email, id: newUser._id, role: newUser.role })

      newUser.token = token;
      await newUser.save();
      // const newUser = await User.create(req.body);

      // Return a success response
      res.status(201).json({ status: httpStatus.SUCCESS, message: 'User created successfully', user: newUser });
    } catch (error) {
      // Handle any errors
      console.error('Error in signup:', error);
      const err = AppError.create(`Internal server error ${error.message}`, 500, httpStatus.Error)
      return next(err);
    }
  }
)

const login = asyncWrapper(
  async (req, res, next) => {
    try {
      // Validate data
      const { email, password } = req.body;

      // Check if all required fields are provided
      if (!email || !password) {
        const error = AppError.create('Please provide both email and password', 400, httpStatus.FAIL)
        return next(error);
      }

      // Find the user by email
      const user = await User.findOne({ email });

      // Check if the user exists
      if (!user) {
        const error = AppError.create('User not found', 404, httpStatus.FAIL)
        return next(error);
      }

      // Validate the password
      if (user.password !== password) {
        const error = AppError.create('Incorrect password', 401, httpStatus.FAIL)
        return next(error);
      }
      //creat token
      const token = await jwt_generat({ email: user.email, id: user._id, role: user.role })

      // Successful login
      res.status(200).json({ status: httpStatus.SUCCESS, message: 'Login successful', data: user });
    } catch (error) {
      // Handle any errors
      console.error('Error in login:', error);
      const err = AppError.create('Incorrect password', 500, httpStatus.Error)
      return next(err);
    }
  })

const updateUser = asyncWrapper(
  async (req, res, next) => {
    const userId = req.params.id;
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Assuming you have validation functions for email and password
    // Implement your validation logic here

    try {
      // Update user in the database
      const updatedUser = await User.findByIdAndUpdate(userId, { email, password }, { new: true });

      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
)

const deleteUser = asyncWrapper(
  async (req, res, next) => {
    const userId = req.params.id;

    try {
      // Delete user from the database
      const deletedUser = await User.findByIdAndDelete(userId);

      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  })
// Other controller methods...




module.exports = {
  signup,
  login,
  deleteUser,
  updateUser
}