import * as contactsServices from "../servises/contactsServices.js"
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import mongoose from 'mongoose';
import { updateContactSchema } from "../schemas/contactsSchemas.js";


export const getAllContacts = ctrlWrapper(async (req, res) => {
  const contacts = await contactsServices.getAllContacts();
  if (!contacts) {
    throw HttpError(404, "Not found");
  }
  res.json(contacts);
});

export const getOneContact = ctrlWrapper(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid contact ID' });
  }

  const oneContact = await contactsServices.getOneContact(id);
  if (!oneContact) {
    return res.status(404).json({ message: 'Not found' });
  }
  res.json(oneContact);
});

export const deleteContact = ctrlWrapper(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid contact ID' });
  }

  const deletedContact = await contactsServices.deleteContact(id);
  if (!deletedContact) {
    return res.status(404).json({ message: 'Not found' });
  }
  res.json(deletedContact);
});

export const createContact = ctrlWrapper(async (req, res) => {
  const result = await contactsServices.createContact(req.body);
  res.status(201).json(result);
});

export const updateContact = ctrlWrapper(async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const existingContact = await contactsServices.updateContact(id);
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

  const updatedContact = await contactsServices.updateContact(id, body, { new: true });

  res.status(200).json(updatedContact);
});


export const updateStatusContact = ctrlWrapper(async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

    const updatedFavorite = await contactsServices.updateStatusContact(
      contactId,
      { favorite },
      { new: true }
  );
  
    if (!updatedFavorite) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(updatedFavorite);
  });
