const express = require('express');
const { createCartItem } = require('../controllers/cartItem.controller');

const cartItemRouter = express.Router();

cartItemRouter.post('/', createCartItem)

module.exports = cartItemRouter;

