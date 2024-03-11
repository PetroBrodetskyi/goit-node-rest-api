import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve('db', 'contacts.json');

const updateContacts = contacts => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading file:', error.message);
    return [];
  }
}

export async function getContactById(id) {
  const contacts = await listContacts();
  const result = contacts.find(contact => contact.id === id);
  return result || null;
}

export async function deleteContact(id) {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === id);
    if (index === -1) {
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await updateContacts(contacts);
    return result;
}

export async function createContact(data) {
  const contacts = await listContacts();
  const newContact = {
        id: nanoid(),
        ...data,
    };
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
}

export async function updateContact(id, newData) {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { ...contacts[index], ...newData };
  await updateContacts(contacts);
  return contacts[index];
}