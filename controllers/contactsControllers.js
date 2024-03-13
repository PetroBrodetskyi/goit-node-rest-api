import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import { updateContactSchema } from "../schemas/contactsSchemas.js";


export const getAllContacts = ctrlWrapper(async (req, res) => {
  const result = await contactsService.listContacts();
  res.json(result);
});

export const getOneContact = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.getContactById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
});

export const deleteContact = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const deletedContact = await contactsService.deleteContact(id);
  if (!deletedContact) {
    throw HttpError(404, "Not found");
  }
  res.json(deletedContact);
});

export const createContact = ctrlWrapper(async (req, res) => {
  const result = await contactsService.createContact(req.body);
  res.status(201).json(result);
});

export const updateContact = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const existingContact = await contactsService.getContactById(id);
  if (!existingContact) {
    return res.status(404).json({ message: "Not found" });
  }

  try {
    await updateContactSchema.validateAsync(body);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  if (!Object.keys(body).length) {
    return res.status(400).json({ message: "Body must have at least one field" });
  }

  const updatedContact = await contactsService.updateContact(id, {
    ...existingContact,
    ...body
  });

  res.status(200).json(updatedContact);
});
