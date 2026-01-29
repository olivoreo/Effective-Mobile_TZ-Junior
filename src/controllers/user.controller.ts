import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User";
import { generateToken } from "../utils/jwt";
import { AuthRequest } from "../middlewares/auth.middleware";

// 1. Registration
export const register = async (req: Request, res: Response) => {
    const { fullName, birthDate, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
        return res.status(400).json({ message: "Email already used" });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
        fullName,
        birthDate,
        email,
        password: hash,
    });

    res.status(201).json(user);
};

// 2. Login
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!user.isActive) {
        return res.status(403).json({ message: "User is blocked" });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken({
        id: user._id,
        role: user.role,
    });

    res.json({ token });
};

// 3. Get user by id
export const getUserById = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    if (req.user.role !== "admin" && req.user.id !== id) {
        return res.status(403).json({ message: "Access denied" });
    }

    const user = await User.findById(id).select("-password");

    if (!user) {
        return res.status(404).json({ message: "Not found" });
    }

    res.json(user);
};

// 4. Get all users (admin)
export const getAllUsers = async (req: Request, res: Response) => {
    const users = await User.find().select("-password");
    res.json(users);
};

// 5. Block user
export const blockUser = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    if (req.user.role !== "admin" && req.user.id !== id) {
        return res.status(403).json({ message: "Access denied" });
    }

    const user = await User.findByIdAndUpdate(
        id,
        { isActive: false },
        { new: true }
    );

    if (!user) {
        return res.status(404).json({ message: "Not found" });
    }

    res.json({ message: "User blocked" });
};
