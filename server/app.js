if(process.env.NODE_ENV === 'development'){
    require('dotenv').config();
}
const express = require('express');
const router = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', router);

app.listen(process.env.PORT, () =>{
    console.log(`listening on port ${process.env.PORT}`);
});