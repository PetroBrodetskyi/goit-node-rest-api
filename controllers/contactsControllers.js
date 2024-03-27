import * as contactsServices from "../servises/contactsServices.js"
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import { updateContactSchema } from "../schemas/contactsSchemas.js";
import { handleNotFound } from "../helpers/errorHandlers.js";


export const getAllContacts = ctrlWrapper(async (req, res) => {
  const { _id: owner } = req.user;
  const contacts = await contactsServices.getAllContacts({owner});
  if (!contacts) {
    throw HttpError(404, "Not found");
  }
  res.json(contacts);
});

export const getOneContact = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const oneContact = await contactsServices.getOneContact(id);
  if (!oneContact) {
    return handleNotFound(req, res);
  }
  res.json(oneContact);
});

export const deleteContact = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const deletedContact = await contactsServices.deleteContact(id);
  if (!deletedContact) {
    return handleNotFound(req, res);
  }
  res.json(deletedContact);
});

export const createContact = ctrlWrapper(async (req, res) => {
  const { name, email, phone, favorite } = req.body;
  const owner = req.user._id;
  const result = await contactsServices.createContact({ name, email, phone, favorite, owner });
  res.status(201).json(result);
});

export const updateContact = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const { body } = req;


  const existingContact = await contactsServices.updateContact(id);
  if (!existingContact) {
    return handleNotFound(req, res);
  }

  try {
    await updateContactSchema.validateAsync(body);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  if (!Object.keys(body).length) {
    return res.status(400).json({ message: "Body must have at least one field" });
  }

  const updatedContact = await contactsServices.updateContact(id, body, { new: true });

  res.status(200).json(updatedContact);
});


export const updateStatusContact = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;

  const updatedFavorite = await contactsServices.updateStatusContact(
      id,
      { favorite },
      { new: true }
  );
  
  if (!updatedFavorite) {
    return handleNotFound(req, res);
  }

    res.status(200).json(updatedFavorite);
  });
