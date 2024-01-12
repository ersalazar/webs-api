import { Request, Response } from 'express'; // Import Request and Response from express
import User, { IUser } from '../models/User';
import bcrypt from 'bcrypt';
const UserService = require('../services/UserService'); // Import UserService


const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json({data: users }); // Use .status(200) and .json() for response
  } catch (err) {
    console.error(err);
    throw new HttpErrors(500, `Internal server error while fetching all the users on controller`);
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await UserService.getUserById(id);
    if (!user) {
        res.status(404).json({message: `User not found with id ${id}`});
    }
    res.status(200).json({data: user });
  } catch (err) {
    console.error(err);
    throw new HttpErrors(500, `Internal server error while fetching user with id ${req.params.id} on controller`);
  }
};

const createUser = async (req: Request, res: Response) => {
    try {
      const { email, password, role } = req.body;
      
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds
  
      // Create the user with the hashed password
      const newUser = new User({
        email,
        password: hashedPassword, // Store the hashed password in the database
        role,
      });
  
      await newUser.save();
  
      res.status(201).json({ data: newUser });
    } catch (err) {
      console.error(err);
      throw new HttpErrors(500, 'Internal server error while creating a user');
    }
  };

  const updateUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { email, password, role } = req.body;
  
      // Find the user by ID
      const user: IUser | null = await User.findById(id);
  
      if (!user) {
        return res.status(404).json({ error: `User not found with id ${id}` });
      }
  
      // If a new password is provided, hash it
      let updatedPassword = user.password;
      if (password) {
        updatedPassword = await bcrypt.hash(password, 10);
      }
  
      // Update user properties
      user.email = email || user.email;
      user.password = updatedPassword;
      user.role = role || user.role;
  
      // Save the updated user
      await user.save();
  
      res.status(200).json({ data: user });
    } catch (err) {
      console.error(err);
      throw new HttpErrors(500, 'Internal server error while updating the user');
    }
  };
  

const deleteUser = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const deleted = await UserService.deleteUser(req.params.id);
    if (!deleted) {
        res.status(404).json({message: `User not found with id ${id}`});
    }
    res.status(204).json();
  } catch (err) {
    console.error(err);
    throw new HttpErrors(500, `Internal server error while deleting user with id ${req.params.id} on controller`);
  }
};

