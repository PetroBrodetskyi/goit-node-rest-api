import express from "express";
import validateBody from "../helpers/validateBody.js";
import { registerUserSchema, emailSchema, loginUserSchema } from "../schemas/usersSchemas.js";
import { registerUser, loginUser, getCurrentUser, logoutUser, uploadAvatar, verifyEmail, resendVerifyEmail } from "../controllers/usersControllers.js"
import { authanticate } from "../middlewares/authanticate.js";

const usersRouter = express.Router();


usersRouter.post("/register", validateBody(registerUserSchema), registerUser);

usersRouter.get("/verify/:verificationToken", verifyEmail);

usersRouter.post("/verify", validateBody(emailSchema), resendVerifyEmail);

usersRouter.post("/login", validateBody(loginUserSchema), loginUser);

usersRouter.get("/current", authanticate, getCurrentUser);

usersRouter.patch("/avatars", authanticate, uploadAvatar);

usersRouter.post("/logout", authanticate, logoutUser);


export default usersRouter;
