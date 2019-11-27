if (process.env.NODE_ENV === 'development') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandling');
const PORT = process.env.PORT || 3000;

//connection mongoose
mongoose.connect('mongodb://localhost:27017/fancyTodo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) console.log('Failed To Connect DB');
    else console.log('Connected to DB');
});

app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());
app.use('/', routes);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Listen to Port : ${PORT}`);
})

module.exports = app;