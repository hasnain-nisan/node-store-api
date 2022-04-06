require('dotenv').config();

const connectDB = require('./db/connectDB')
const Product = require('./models/Product')

const jsonProducts = require('./products.json')

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        await Product.deleteMany();
        await Product.create(jsonProducts)
    } catch (error) {
        console.log(error);
    }
}

start()