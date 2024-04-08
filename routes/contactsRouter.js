import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js";

import validateBody from "../helpers/validateBody.js" 
import { createContactSchema, updateContactSchema, updateFavoriteSchema } from "../schemas/contactsSchemas.js";
import { validateId } from "../middlewares/idValidator.js";
import { authanticate } from "../middlewares/authanticate.js";

const contactsRouter = express.Router();

contactsRouter.get("/", authanticate, getAllContacts);

contactsRouter.get("/:id", authanticate, validateId, getOneContact);

contactsRouter.delete("/:id", authanticate, validateId, deleteContact);

contactsRouter.post("/", [authanticate, validateBody(createContactSchema), createContact]);

contactsRouter.put("/:id", [authanticate, validateId, validateBody(updateContactSchema), updateContact]);

contactsRouter.patch("/:id/favorite", [authanticate, validateId, validateBody(updateFavoriteSchema)], updateStatusContact);

export default contactsRouter;