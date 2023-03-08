const { Cart } = require('../models')


const createCart = async (req, res) => {
    const cart = req.body;
    try {
        const cartNew = await Cart.build(cart)
        cartNew.save()
        res.status(201).send(cartNew)
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    createCart,
}