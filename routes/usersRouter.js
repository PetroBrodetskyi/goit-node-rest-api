import express from "express";
import validateBody from "../helpers/validateBody.js";
import { registerUserSchema, loginUserSchema } from "../schemas/usersSchemas.js";
import { registerUser, loginUser} from "../controllers/usersControllers.js"

const usersRouter = express.Router();


usersRouter.post("/register", validateBody(registerUserSchema), registerUser);

usersRouter.post("/login", validateBody(loginUserSchema), loginUser);




export default usersRouter;