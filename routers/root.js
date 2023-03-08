const express = require('express');
const cartRouter = require('./cart.router');
const cartItemRouter = require('./cartItem.router');
const categoryRouter = require('./category.router');
const newsRouter = require('./news.router');
const productRouter = require('./product.router');
const userRouter = require('./user.router');
const rootRouter = express.Router();

rootRouter.use('/user', userRouter)
rootRouter.use('/category', categoryRouter)
rootRouter.use('/product', productRouter)
rootRouter.use('/news', newsRouter)
rootRouter.use('/cart', cartRouter)
rootRouter.use('/cartItems', cartItemRouter)


module.exports = rootRouter