import Contact from "../models/contactModel.js";

export const getAllContacts = (owner, options) => Contact.find({ owner })
  .skip((options.page - 1) * options.limit)
  .limit(options.limit);

export const getOneContact = (id, owner) => Contact.findOne({ _id: id, owner });

export const deleteContact = (id, owner) => Contact.findOneAndDelete({ _id: id, owner });

export const createContact = (contactData) => Contact.create(contactData);

export const updateContact = (id, data, owner) => Contact.findOneAndUpdate({ _id: id, owner }, data, { new: true });

export const updateStatusContact = (contactId, data, options) => Contact.findByIdAndUpdate(contactId, data, options);