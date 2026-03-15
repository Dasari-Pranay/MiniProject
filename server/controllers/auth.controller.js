import genToken from "../config/token.js";
import User from "../models/user_model.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        let token = await genToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(201).json(user);

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: `Register error ${error}`
        });

    }
};

export const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        let token = await genToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json(user);

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: `Login error ${error}`
        });

    }
};

export const googleAuth = async (req, res) => {
    try {

        const { name, email, photo } = req.body;

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                name,
                email,
                photo
            });
        }

        let token = await genToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json(user);

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message: `Google Auth error ${error}`
        });
    }
};

export const logOut = async (req, res) => {
    try {

        res.clearCookie("token");

        return res.status(200).json({
            message: "Logout Successfully"
        });

    } catch (error) {

        return res.status(500).json({
            message: `Logout error ${error}`
        });

    }
};
