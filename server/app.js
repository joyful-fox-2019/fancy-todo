if (process.env.NODE_ENV === 'development') {
	require('dotenv').config();
}

const express = require('express');
const app = express();
const PORT = process.env.PORT;
const morgan = require('morgan');
const cors = require('cors');
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
app.use(morgan('dev'));
app.use(cors());

app.use('/', require('./routes'));
app.use(require('./middlewares/errorHandler'));

app.listen(PORT, () => console.log('app listening to port', PORT));
