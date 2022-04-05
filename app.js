require('dotenv').config();

//async errors

const express = require('express');
const app = express();

const connectDB = require('./db/connectDB')

const notFoundMiddleware = require('./middleware/not-found-middleware');
const errorMiddleware = require('./middleware/error-handler-middleware');

//middleware
app.use(express.json());


//routes
app.get('/', (req, res) => {
    res.send(`<div style="display:flex; align-items:center; flex-direction:column;">
        <h1 >Store API with Node and MongoDB</h1>
        <a href="/api/v1/products">See products</a>
    </div>`)
})

//products routes


app.use(notFoundMiddleware);
app.use(errorMiddleware);


//port
const port = process.env.PORT || 5000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listeniing on port ${port}`))
    } catch (error) {
        console.log(error);
    }
}

start();

