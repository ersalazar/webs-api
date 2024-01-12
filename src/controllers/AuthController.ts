import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User'; // Import your User model

const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user: IUser | null = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ status: 'Unauthorized', message: 'Invalid credentials' });
    }

    // Verify the password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ status: 'Unauthorized', message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      {
        email: user.email,
        id: user._id,
      },
      process.env.TOKEN_SECRET || '', // Add a default value or proper handling
      { expiresIn: process.env.TOKEN_EXPIRATION || '1h' } // Add a default value or proper handling
    );

    // Send the token in the response
    res.status(200).json({ status: 'Authenticated', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'Internal Server Error', message: 'Failed to sign in' });
  }
};

export default signIn;
