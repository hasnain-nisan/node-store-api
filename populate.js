require('dotenv').config();

const connectDB = require('./db/connectDB')
const Product = require('./models/Product')
// const Message = require('./models/Message')

const jsonProducts = require('./products.json')
// const jsonMessages = require('./message.json')

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        await Product.deleteMany();
        await Product.create(jsonProducts)
        console.log('success...!!!')
        process.exit(0)
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

start()