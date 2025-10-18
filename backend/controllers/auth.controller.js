import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import cloudinary from "../lib/cloudinary.js";

// user signup
export const signup = async (req, res) => {
    try {
        const { fullName, email, password, profilePicture } = req.body;

        if (!email || !password || !fullName) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        //check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        let profilePictureUrl;
        if (profilePicture) {
            const uploadResponse = await cloudinary.uploader.upload(profilePicture);
            profilePictureUrl = uploadResponse.secure_url;
        } else {
            const idx = Math.floor(Math.random() * 100) + 1; // generate a num between 1-100
            profilePictureUrl = `https://avatar.iran.liara.run/public/${idx}.png`;
        }


        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
            profilePicture: profilePictureUrl,
        });

        await newUser.save();

        //creating jwt token
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "7d",
        });

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true, // prevent XSS attacks,
            sameSite: "strict", // prevent CSRF attacks
            secure: process.env.NODE_ENV === "production",
        });

        return res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePicture: newUser.profilePicture,
            token,
        });
    } catch (error) {
        console.log("error in signup controller", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: "User not found" });

        const isPasswordCorrect = await user.matchPassword(password);
        if (!isPasswordCorrect) return res.status(401).json({ message: "Invalid email or password" });

        //creating jwt token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "7d",
        });

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true, // prevent XSS attacks,
            sameSite: "strict", // prevent CSRF attacks
            secure: process.env.NODE_ENV === "production",
        });

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePicture: user.profilePicture,
            token,
        });
    } catch (error) {
        console.log("error in login controller", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const logout = (req, res) => {
    try {
        res.clearCookie("jwt");
        res.status(200).json({ success: true, message: "Logout successful" });
    } catch (error) {
        console.log("error in logout controller", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const onboard = async (req, res) => {
    try {
        const userId = req.user._id;
        const { fullName, bio, techIntrests, skillLevel, collaborationStyle } = req.body;

        const allowedSkillLevels = ["begginer", "intermediate", "advance"];

        //Check for missing fields
        if (!fullName || !bio || !techIntrests || !skillLevel || !collaborationStyle) {
            return res.status(400).json({
                message: "All fields are required",
                missingFields: [
                    !fullName && "fullName",
                    !bio && "bio",
                    !techIntrests && "techIntrests",
                    !skillLevel && "skillLevel",
                    !collaborationStyle && "collaborationStyle",
                ].filter(Boolean),
            });
        }

        //Case-insensitive validation for skillLevel
        const normalizedSkillLevel = skillLevel.toLowerCase();
        if (!allowedSkillLevels.includes(normalizedSkillLevel)) {
            return res.status(400).json({
                message: `Invalid skillLevel. Allowed values are: ${allowedSkillLevels.join(", ")}`,
            });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                fullName,
                bio,
                techIntrests,
                skillLevel: normalizedSkillLevel, //store in lowercase form
                collaborationStyle,
                isOnboarded: true,
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User Onboarded Successfully",
            user: updatedUser,
        });

    } catch (e) {
        console.error("Error In Onboarding:", e.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

