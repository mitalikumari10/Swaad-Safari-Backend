// controllers/contactController.js

import Contact from '../models/Contact.js';

export const createContact = async (req, res, next) => {
    try {
        const { name, email, phoneNumber, message } = req.body;

        const contact = await Contact.create({ name, email, phoneNumber, message });

        res.status(201).json({ success: true, message: 'Contact message sent successfully', data: contact });
    } catch (error) {
        next(error);
    }
};
