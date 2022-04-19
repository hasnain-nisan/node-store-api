const Product = require('../models/Product')

const getAllProductsStatic = async (req, res) => {
    res.status(200).json({msg: 'Product Testing route'})

    //set error
    throw new Error('Test async error pack')
}

const getAllProducts = async (req, res) => {

    const {featured, company, name, sort, fields} = req.query
    const queryObj = {};

    if(featured){
        queryObj.featured = featured
    }

    if(company){
        queryObj.company = company
    }

    if(name){
        queryObj.name = {$regex: name, $options: 'i'}
    }

    const result = Product.find(queryObj)
    if(sort){
        const sortLists = sort.split(',').join(" ")
        console.log(sortLists);
        result.sort(sortLists)
    } else {
        result.sort('createdAt')
    }

    if(fields){
        const fieldLists = fields.split(',').join(" ")
        console.log(fieldLists)
        result.select(fieldLists)
    } else {
        result.select('name price company rating featured createdAt')
    }

    const products = await result

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