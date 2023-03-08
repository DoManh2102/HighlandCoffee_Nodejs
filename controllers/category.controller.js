const { Category, Product } = require("../models");
const { URL_BACKEND } = require("../routers/configRoute");



const getAllCategory = async (req, res) => {
    const { } = req.body;
    try {
        const listCategory = await Category.findAll({
            include: [
                {
                    model: Product
                }
            ]
        })
        res.status(201).send(listCategory)
    } catch (error) {
        res.status(500).send(error)
    }
}

const getCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await Category.findOne({
            where: {
                id,
            }
        })
        res.status(201).send(category)
    } catch (error) {
        res.status(500).send(error)
    }
}

const createCategory = async (req, res) => {
    const { file } = req;
    const category = req.body;
    const urlImg = `${URL_BACKEND}/${file.path}`
    try {
        const newCategory = await Category.build(category)
        newCategory.category_img = urlImg;
        newCategory.save()
        res.status(201).send(newCategory)
    } catch (error) {
        res.status(500).send(error)
    }
}

const deleteCategory = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const category = await Category.destroy({
            where: {
                id,
            }
        })
        res.status(201).send("xoá thành công")
    } catch (error) {
        res.status(500).send('not found!')
    }
}

const updateCategory = async (req, res) => {
    const category = req.body;
    const { id } = req.params;
    try {
        const categoryFound = await Category.findOne({
            while: {
                id,
            }
        })
        if (categoryFound) {
            const categoryUpdate = await Category.update(category, {
                where: {
                    id
                }
            })
            res.status(201).send('update thành công')
        }
        else {
            res.status(404).send("Not Found!")
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    getAllCategory,
    getCategoryById,
    createCategory,
    deleteCategory,
    updateCategory
}
