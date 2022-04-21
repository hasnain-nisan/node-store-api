const Product = require('../models/Product')

const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({
        price:{
            $gt: 30,
            $lt: 100
        }
    })
        .sort('price')
        .select('name price')
        .limit(10)
        .skip(1)

    res.status(200).json({
        msg: 'Product testing route',
        products,
        nbHits: products.length
    })
    //set error
    // throw new Error('Test async error pack')
}

const getAllProducts = async (req, res) => {

    const {featured, company, name, sort, fields, numericFilters} = req.query
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
        result.sort(sortLists)
    } else {
        result.sort('createdAt')
    }

    if(fields){
        const fieldLists = fields.split(',').join(" ")
        result.select(fieldLists)
    } else {
        result.select('name price company rating featured createdAt')
    }

    if(numericFilters){
        console.log(numericFilters);
        const fieldLists = fields.split(',').join(" ")
        result.select(fieldLists)
    } else {
        result.select('name price company rating featured createdAt')
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page -1) * limit

    result.skip(skip).limit(limit)

    const products = await result
    const p = await Product.find({})
    const total_page = Math.ceil(p.length/limit)
    const next_page = page + 1 <= total_page ? page + 1 : null
    const prev_page = page - 1 >= 1 ? page - 1 : null

    res.status(200).json({
        msg: 'Product route',
        products,
        nbHits: products.length,
        page,
        total_page,
        next_page,
        prev_page
    })
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}