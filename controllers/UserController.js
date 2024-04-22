const User = require('../models/user_model');
const validator = require('validator');
const jwt_generat = require('../utility/jwt_generat');
class UserController {
  async signup(req, res) {
    try {
      // Validate data
      const { firstName, lastName, email, password, role } = req.body;



      // Check if all required fields are provided
      if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ error: 'Please provide all required fields' });
      }

      // Validate firstName
      if (firstName.trim().length === 0) {
        return res.status(400).json({ error: 'firstName cannot be empty' });
      }
      if (lastName.trim().length === 0) {
        return res.status(400).json({ error: 'lastName cannot be empty' });
      }
      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
      }

      // Validate password
      if (password.length < 8) {
        return res.status(400).json({ error: 'Password should be at least 8 characters long' });
      }
      if (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
        return res
          .status(400)
          .json({ error: 'Password should contain both letters and numbers' });
      }

      // Check if email is unique
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      // Create a new user
      const newUser = new User({
        firstName,
        lastName,
        email,
        password,
        role
      })

      const token = await jwt_generat({ email: newUser.email, id: newUser._id })

      newUser.token = token;
      await newUser.save();
      // const newUser = await User.create(req.body);

      // Return a success response
      res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      // Handle any errors
      console.error('Error in signup:', error);
      res.status(500).json({ error: `Internal server error ${error}` });
    }
  }

  async login(req, res) {
    try {
      // Validate data
      const { email, password } = req.body;

      // Check if all required fields are provided
      if (!email || !password) {
        return res.status(400).json({ error: 'Please provide both email and password' });
      }

      // Find the user by email
      const user = await User.findOne({ email });

      // Check if the user exists
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Validate the password
      if (user.password !== password) {
        return res.status(401).json({ error: 'Incorrect password' });
      }
      //creat token
      const token = await jwt_generat({ email: user.email, id: user._id })

      // Successful login
      res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
      // Handle any errors
      console.error('Error in login:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateUser(req, res) {
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

  async deleteUser(req, res) {
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
  }
} // Other controller methods...




module.exports = new UserController();