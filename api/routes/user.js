const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth')

// POST request for user signup, handled by the "user_signup" function in the controller
router.post("/signup", UserController.user_signup);

// POST request for user login, handled by the "user_login" function in the controller
router.post("/login", UserController.user_login);

// DELETE request for deleting a user by user ID, protected by the "checkAuth" middleware, handled by the "user_delete" function in the controller
router.delete("/:userId", checkAuth, UserController.user_delete);

module.exports = router;