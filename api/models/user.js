const mongoose = require('mongoose');

// Define a user schema using the mongoose.Schema constructor
const userSchema = mongoose.Schema({
    // Define the unique identifier for a user
    _id: mongoose.Schema.Types.ObjectId,

    // Define the email field with constraints
    email: { 
        type: String,          
        required: true,        
        unique: true,          
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        // Regular expression pattern for validating email format
    },
    
    // Define the password field
    password: {
        type: String,          
        required: true       
    }
});

// Export the User model based on the userSchema
module.exports = mongoose.model('User', userSchema);
