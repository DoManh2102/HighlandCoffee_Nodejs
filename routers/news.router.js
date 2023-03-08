const express = require('express');
const { getAllNews, createNews, updateNews, deleteNews, getNewsById } = require('../controllers/news.controller');
const { uploadImage } = require('../middlewares/upload/upload-image');
const { checkExist } = require('../middlewares/validation/checkExist');
const { News } = require('../models')

const newsRouter = express.Router();

newsRouter.get('/', getAllNews)
newsRouter.get('/:id', getNewsById)
newsRouter.post('/', uploadImage("news_img"), createNews)
newsRouter.post('/:id', checkExist(News), updateNews);
newsRouter.delete('/:id', checkExist(News), deleteNews);

module.exports = newsRouter;

