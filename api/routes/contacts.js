const { request } = require('express');
const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const ContactsController = require('../controllers/contacts')

// GET request for retrieving all contacts, handled by the "contacts_get_all" function in the controller
router.get('/', ContactsController.contacts_get_all);

// POST request for creating a new contact, protected by the "checkAuth" middleware, handled by the "contacts_create_contact" function in the controller
router.post('/', checkAuth, ContactsController.contacts_create_contact);

// GET request for retrieving a specific contact by ID, handled by the "contacts_get_contact" function in the controller
router.get('/:contactId', ContactsController.contacts_get_contact);

// PATCH request for updating a specific contact by ID, protected by the "checkAuth" middleware, handled by the "contacts_update_contact" function in the controller
router.patch('/:contactId', checkAuth, ContactsController.contacts_update_contact);

// DELETE request for deleting a specific contact by ID, protected by the "checkAuth" middleware, handled by the "contacts_delete_contact" function in the controller
router.delete('/:contactId', checkAuth, ContactsController.contacts_delete_contact);

module.exports = router;