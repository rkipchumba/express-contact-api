const express = require('express');
const app = express();
const morgan = require('morgan')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const contactctRoutes = require('./api/routes/contacts');
const userRoutes = require('./api/routes/user');

// Connect to the MongoDB database using environment variables
mongoose.connect(
    'mongodb://admin:' +
     process.env.MONGO_ATLAS_PW + 
     '@ac-6ojsnsd-shard-00-00.mp5lucr.mongodb.net:27017,ac-6ojsnsd-shard-00-01.mp5lucr.mongodb.net:27017,ac-6ojsnsd-shard-00-02.mp5lucr.mongodb.net:27017/?replicaSet=atlas-7ngzvg-shard-0&ssl=true&authSource=admin')

     {
         usMongoClient: true
     }
mongoose.Promise = global.Promise;
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Set up CORS handling middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers', 
        "Origin, X-Requested-With, Content-Type, Accep, Authorization"
        );
        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
});

// Routes handling requests
app.use('/contacts', contactctRoutes);
app.use("/user", userRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});


module.exports = app;