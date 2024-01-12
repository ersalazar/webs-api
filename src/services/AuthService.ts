import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer Token

    if (!token) {
        return res.status(403).json({ message: 'A token is required for authentication' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!);
        req.user = decoded as { id: string; [key: string]: any }; // Add the decoded user to the request object
    } catch (err) {
        return res.status(401).json({ message: 'Invalid Token' });
    }

    return next();
};

export default validateToken;
