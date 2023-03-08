const { News } = require('../models')
const { URL_BACKEND } = require('../routers/configRoute')


const getAllNews = async (req, res) => {
    try {
        const listNew = await News.findAll()
        res.status(201).send(listNew)
    } catch (error) {
        res.status(500).send(error)
    }
}

const getNewsById = async (req, res) => {
    const { id } = req.params;
    try {
        const news = await News.findOne({
            where: {
                id,
            }
        })
        res.status(201).send(news)
    } catch (error) {
        res.status(500).send(error)
    }
}

const createNews = async (req, res) => {
    const { file } = req;
    const news = req.body;
    const urlImg = `${URL_BACKEND}/${file.path}`
    try {
        const dataNews = await News.build(news)
        dataNews.news_img = urlImg;
        dataNews.save()
        res.status(201).send(dataNews)
    } catch (error) {
        res.status(500).send(error)
    }
}


const updateNews = async (req, res) => {
    const { id } = req.params;
    const news = req.body;
    console.log('news', news);
    try {
        const newsFound = await News.findOne({
            where: {
                id,
            }
        })
        if (newsFound) {
            const newsUpdate = await News.update(news, {
                where: {
                    id
                }
            })
            res.status(201).send("update thành công")
        }
        else {
            res.status(404).send("Not Found!")
        }
    } catch (error) {
        res.status(201).send(error)
    }
}

const deleteNews = async (req, res) => {
    const { id } = req.params;
    try {
        const news = await News.destroy({
            where: {
                id,
            }
        })
        res.status(201).send("Xoá thành công");
    } catch (error) {
        res.status(201).send(error);
    }
}

module.exports = {
    getAllNews,
    getNewsById,
    createNews,
    updateNews,
    deleteNews,
}