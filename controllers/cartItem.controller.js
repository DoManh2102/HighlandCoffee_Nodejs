const { CartItem } = require("../models");

const createCartItem = async (req, res) => {
    const cartItem = req.body;
    try {
        const newCartItem = await CartItem.bulkCreate(cartItem)
        newCartItem.save()
        res.status(201).send(newCartItem)
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    createCartItem,
}