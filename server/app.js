if(process.env.NODE_ENV == 'development') {
  require('dotenv').config()
}

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
const index= require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

mongoose.connect(process.env.MONGO_URL, {
  useFindAndModify: false,
  useUnifiedTopology: true,
  useNewUrlParser: true
}, (err) => {
  if(err) console.log(err);
  else console.log(`mongodb connected`);
})

app.use('/', index);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))