import * as userServices from "../servises/usersServices.js"
import bcrypt from "bcrypt";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import { registerUserSchema, loginUserSchema } from "../schemas/usersSchemas.js"
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const { SECRET_KEY } = process.env;

export const registerUser = ctrlWrapper(async (req, res) => {

    const { error } = registerUserSchema.validate(req.body);
    if (error) {
        res.status(400).json({ message: error.message });
    return;
    }

    const { email, password } = req.body;

    const existingUser = await userServices.findUser({ email });
    if (existingUser) {
        throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    
    const newUser = await userServices.signup({
        email: email,
        password: hashPassword,
    });

    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription,
    });

});


export const loginUser = ctrlWrapper(async (req, res) => {

    const { error } = loginUserSchema.validate(req.body);
    if (error) {
        res.status(401).json({ message: error.message });
    return;
    }
    
    const { email, password } = req.body;
    
    const existingUser = await userServices.findUser({ email });

    if (!existingUser) {
        throw HttpError(401, "Email or password is wrong");
    }

    const passwordCompare = await bcrypt.compare(password, existingUser.password);
    if (!passwordCompare) {
        throw HttpError(401, "Email or password is wrong");
    }

    const payload = {
        id: existingUser._id,
    }

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

    await User.findByIdAndUpdate(existingUser._id, { token });

    res.status(200).json({
        token,
        user: {
        email: existingUser.email,
        subscription: existingUser.subscription,
    }
    });
});

export const getCurrentUser = ctrlWrapper(async (req, res) => {
    const { email, subscription } = req.user;

    res.json({
        email,
        subscription,
    })
});

export const logoutUser = ctrlWrapper(async(req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: null });

      res.status(204).json({ message: "No Content" });
});