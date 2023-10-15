const Contact = require('../models/contact');
const mongoose = require('mongoose');

// Get all contacts from the database
exports.contacts_get_all = (req, res, next) => {
    Contact.find()
        .select('first_name last_name phone_number')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                contacts: docs.map(doc => {
                    return {
                        first_name: doc.first_name,
                        last_name: doc.last_name,
                        phone_number: doc.phone_number,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: "http://localhost:3000/contacts/" + doc._id
                        }
                    };
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};

// Create a new contact
exports.contacts_create_contact = (req, res, next) => {
    const contact = new Contact({
        _id: new mongoose.Types.ObjectId(),
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone_number: req.body.phone_number
    });
    

    contact
        .save()
        .then(doc => {
            console.log(doc);
            res.status(201).json({
                message: 'Added a contact successfuly',
                createdContact: {
                    first_name: doc.first_name,
                    last_name: doc.last_name,
                    phone_number: doc.phone_number,
                    _id: doc._id,
                    request: {
                        type: 'GET',
                        url: "http://localhost:3000/contacts/" + doc._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}
// Get a specific contact by ID
exports.contacts_get_contact = (req, res, next) => {
    const id = req.params.contactId;
    Contact.findById(id)
        .select('first_name last_name phone_number')
        .exec()
        .then(doc => {
            console.log("From DB",doc);

            if (doc) {
                res.status(200).json( {
                    contact: doc,
                    request: {
                        type: 'GET',
                        url: "http://localhost:3000/contacts/"  
                    }
                });
            } else {
                res.status(404).json({
                    message: 'Not a valid entry'
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}
// Update a contact's information
exports.contacts_update_contact = (req, res, next) => {
    const id = req.params.contactId;
    const updateOps = {};
  
    // Convert req.body to an array of key-value pairs
    const entries = Object.entries(req.body);
  
    // Iterate over the array and update the updateOps object
    for (const [propName, value] of entries) {
      updateOps[propName] = value;
    }
  
    Contact.updateOne({ _id: id }, { $set: updateOps })
      .exec()
      .then(result => {
        res.status(200).json({
          message: 'Contact updated',
          request: {
            type: 'GET',
            url: `http://localhost:3000/contacts/${id}`,
            // body: {first_name: 'String'}
          },
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  }

  // Delete a contact
  exports.contacts_delete_contact = (req, res, next) => {
    const id = req.params.contactId;
    Contact.deleteOne({ _id: id })
      .exec()
      .then(result => {
        if (result.deletedCount === 1) {
          res.status(200).json({ 
              message: 'contact deleted',
              request: {
                  type: 'POST',
                  url: "http://localhost:3000/contacts/",
                  body: {first_name: 'String',last_name: 'String', phone_number: 'Number'}
              } 
            });
        } else {
          res.status(404).json({ message: 'contact not found' });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  }