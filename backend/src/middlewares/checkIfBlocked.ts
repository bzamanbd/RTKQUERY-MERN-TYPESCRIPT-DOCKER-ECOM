import { Request, Response, NextFunction } from 'express';
import { User } from "../models/user";


const checkIfBlocked = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const { email } = req.body;
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user is blocked
    if (user.isBanned) {
      return res.status(403).json({ message: 'Your account is blocked. Please contact support' });
    }

    // If not blocked, proceed to the next middleware or controller
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export default checkIfBlocked;
