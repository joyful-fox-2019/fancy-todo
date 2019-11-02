const Route = require('express').Router();
const QuoteCont = require('../controllers/quoteController');
const { authentication } = require('../middlewares/auth');

Route.get('/', authentication, QuoteCont.getRandom);

module.exports = Route;