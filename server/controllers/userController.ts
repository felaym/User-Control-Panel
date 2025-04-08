import { Request, RequestHandler, Response } from 'express';

import User from '../models/userModel';

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
    }
};

export const getUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
};

export const updateUser: RequestHandler = async (req, res) => {
    try {
        const result = await User.updateOne({ _id: req.params.id }, req.body);
        if (result.modifiedCount === 0) {
            res.status(404).json({ message: "No user was updated." });
            return;
        }
        res.json({ message: "User updated successfully." });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
    }
};
