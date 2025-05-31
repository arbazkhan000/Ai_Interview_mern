import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.schema.js";

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
};

const UserController = {
    regiterUser: async (req, res) => {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false,
            });
        }

        try {
            const user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({
                    message: "User already exists",
                    success: false,
                });
            }

            const hashpassword = await bcrypt.hash(password, 8);

            const newUserData = {
                name: name,
                email: email,
                password: hashpassword,
            };

            const newUser = await User.create(newUserData);
            const token = generateToken({ userId: newUser._id });

            res.status(201).json({
                message: "User created successfully",
                success: true,
                data: newUser,
                token: token,
            });
        } catch (error) {
            console.log("Error in User Create Controller :", error.message);
            res.status(500).json({
                message: "Server error",
                success: false,
            });
        }
    },
    loginUser: async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false,
            });
        }
        try {
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({
                    message: "User not found",
                    success: false,
                });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({
                    message: "Invalid credentials",
                    success: false,
                });
            }
            const token = generateToken({ userId: user._id });

            return res.json({
                message: `Login Successful, Welcome ${user.name}`,
                success: true,
                data: user,
                token: token,
            });
        } catch (error) {
            console.log("Error in Login user Controller :", error.message);
            res.status(500).json({
                message: "Server error from Login",
                error: error.message,
                success: false,
            });
        }
    },

    getProfile: async (req, res) => {
        try {
            const user = await User.findById(req.user);
            if (!user) {
                return res
                    .status(404)
                    .json({ message: "User not found", success: false });
            }

            return res.status(200).json({
                message: "Profile retrieved successfully",
                success: true,
                data: { _id: user._id, name: user.name, email: user.email },
            });
        } catch (error) {
            console.log("Error in profile Controller :", error.message);
            res.status(500).json({
                message: "Server error",
                success: false,
            });
        }
    },
};

export default UserController;
