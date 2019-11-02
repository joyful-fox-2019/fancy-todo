if (process.env.NODE_ENV === 'development') {
	require('dotenv').config();
}

const express = require('express');
const app = express();
const PORT = process.env.PORT;
const mongoose = require('mongoose');
mongoose.connect(
	process.env.MONGODB_URI,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true
	},
	err => {
		if (err) console.log('connetion to mongodb failed.', err);
		else console.log('connection to mongodb success.');
	}
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', require('./routes'));

app.listen(PORT, () => console.log('app listening to port', PORT));
