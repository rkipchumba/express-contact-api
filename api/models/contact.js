const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    first_name:     { type: String },
    last_name:      { type: String },
    phone_number:   { type: Number }
});

module.exports = mongoose.model('Contact', contactSchema);