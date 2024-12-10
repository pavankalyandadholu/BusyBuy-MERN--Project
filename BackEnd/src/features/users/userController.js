import User from './userModel.js';
import { generateToken } from '../../utils/generateToken.js';

// Controller for user registration
export const registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    await User.create({ email, password });
    res.status(201).json({ message: 'Registration is successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for user login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Verify the password
    const isMatch = await user.isPasswordMatch(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate a token and send response
    res.status(200).json({
      id: user._id,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
