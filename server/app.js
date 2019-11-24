if(process.env.NODE_ENV === 'development') {
	require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT;
const cors = require('cors');
const routes = require('./routes/index.js');

mongoose.connect(process.env.MONGODB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
})
	.then(() => console.log('database mongoose connected'))
	.catch(() => console.log('cant connect to database'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.use('/', routes);

app.listen(port, ()=> {
    console.log(`Listening on port : ${port}`);
})
