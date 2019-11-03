if (process.env.NODE_ENV === 'development') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const {errorHandler} = require('./middlewares/errorHandler')

app.use(express.json());
app.use(express.urlencoded({extended: false}));

mongoose
    .connect('mongodb://localhost:27017/fancytodo', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(_ => console.log('connected to database.'))
    .catch(_ => console.log('database connection failed.'));
    
app.use(cors());
app.use('/', routes);
app.use(errorHandler);

app.listen(process.env.PORT, () => console.log('listening on port ', process.env.PORT));