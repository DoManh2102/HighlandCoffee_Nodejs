const express = require('express');
const { createCategory, getAllCategory, deleteCategory, getCategoryById, updateCategory } = require('../controllers/category.controller');
const { uploadImage } = require('../middlewares/upload/upload-image');
const categoryRouter = express.Router();


categoryRouter.get('/', getAllCategory)
categoryRouter.get('/:id', getCategoryById)
categoryRouter.post('/', uploadImage("category_img"), createCategory)
categoryRouter.delete('/:id', deleteCategory)
categoryRouter.post('/:id', updateCategory)


module.exports = categoryRouter;