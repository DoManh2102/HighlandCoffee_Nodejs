const { Product } = require('../models')
const { Op } = require("sequelize");
const { URL_BACKEND } = require('../routers/configRoute');

const getAllProduct = async (req, res) => {
    const { name } = req.query;
    try {
        if (name) {
            const listProduct = await Product.findAll({
                where: {
                    product_name: {
                        [Op.like]: `%${name}%`
                    },
                },
            })
            res.status(201).send(listProduct)
        }
        else {
            const listProduct = await Product.findAll()
            res.status(201).send(listProduct)
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findOne({
            where: {
                id,
            }
        })
        res.status(201).send(product)
    } catch (error) {
        res.status(500).send(error)
    }
}

const createProduct = async (req, res) => {
    const { file } = req;
    const product = req.body;
    const urlImg = `${URL_BACKEND}/${file.path}`
    try {
        const productNew = await Product.build(product)
        productNew.product_img = urlImg;
        productNew.save()
        res.status(201).send(productNew)
    } catch (error) {
        res.status(500).send(error)
    }
}

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;
    // const { file } = req;
    // const urlImg = `http://localhost:3100/${file.path}`
    console.log('product', product);
    try {
        const productFound = await Product.findOne({
            where: {
                id,
            }
        })
        if (productFound) {
            const productUpdate = await Product.update(product, {
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

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.destroy({
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
    getAllProduct,
    createProduct,
    getProductById,
    deleteProduct,
    updateProduct
}