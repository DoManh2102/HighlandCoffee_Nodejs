const express = require('express');
const { getAllProduct, createProduct, getProductById, deleteProduct, updateProduct } = require('../controllers/product.controller');
const { authenTicate } = require('../middlewares/auth/authenticate');// check xem tài khoản đã đăng nhập
const { uploadImage } = require('../middlewares/upload/upload-image');
const { checkExist } = require('../middlewares/validation/checkExist'); //check id có tồn tại?
const { authorize } = require('../middlewares/auth/authorize'); // check quyền đăng nhập là admin

const { Product } = require('../models')

const productRouter = express.Router();

productRouter.get('/', getAllProduct)
productRouter.get('/:id', getProductById)
productRouter.post('/', uploadImage("product_img"), createProduct)
productRouter.post('/:id', checkExist(Product), updateProduct);
productRouter.delete('/:id', checkExist(Product), deleteProduct)

module.exports = productRouter;
