const Product = require('../models/Product')

const getAllProductsStatic = async (req, res) => {
    res.status(200).json({msg: 'Product Testing route'})

    //set error
    throw new Error('Test async error pack')
}

const getAllProducts = async (req, res) => {

    const {featured, company, name} = req.query
    const queryObj = {};

    if(featured){
        queryObj.featured = featured
    }

    if(company){
        queryObj.company = company
    }

    if(name){
        queryObj.name = name
    }

    console.log(queryObj);
    const products = await Product.find(queryObj)
    res.status(200).json({
        msg: 'Product route',
        products,
        nbHits: products.length
    })
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}