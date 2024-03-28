import express from "express";
import validateBody from "../helpers/validateBody.js";
import { registerUserSchema, loginUserSchema } from "../schemas/usersSchemas.js";
import { registerUser, loginUser, getCurrentUser, logoutUser} from "../controllers/usersControllers.js"
import { authanticate } from "../middlewares/authanticate.js";

const usersRouter = express.Router();


usersRouter.post("/register", validateBody(registerUserSchema), registerUser);

usersRouter.post("/login", validateBody(loginUserSchema), loginUser);

usersRouter.get("/current", authanticate, getCurrentUser);

usersRouter.post("/logout", authanticate, logoutUser);


export default usersRouter;