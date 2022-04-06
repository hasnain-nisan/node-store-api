const Product = require('../models/Product')

const getAllProductsStatic = async (req, res) => {
    res.status(200).json({msg: 'Product Testing route'})
    throw new Error('Test async error pack')
}

const getAllProducts = async (req, res) => {
    const product = await Product.find({})
    res.status(200).json({
        msg: 'Product route',
        product
    })
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}