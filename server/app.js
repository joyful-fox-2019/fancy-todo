if(process.env.NODE_ENV === 'development'){
    require('dotenv').config();
}
const express = require('express');
const router = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.use('/', router);

app.listen(process.env.PORT, () =>{
    console.log(`listening on port ${process.env.PORT}`);
});