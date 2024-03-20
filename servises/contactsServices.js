import Contact from "../models/contactModel.js";

export const getAllContacts = () => Contact.find();

export const getOneContact = (id) => Contact.findById(id);

export const deleteContact = (id) => Contact.findByIdAndDelete(id);

export const createContact = (contactData) => Contact.create(contactData);

export const updateContact = (id, data) => Contact.findByIdAndUpdate(id, data, { new: true });

export const updateStatusContact = (id, data, options) => Contact.findByIdAndUpdate(id, data, options);