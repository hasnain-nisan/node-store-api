const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    contact_id: {
        type: String
    },
    user_id: {
        type: String
    },
    type: {
        type: String
    },
    channel_id: {
        type: String
    },
    content: {
        type: Object
    },
    // updated_at:{
    //     type: Object
    // },
    // created_at:{
    //     type: Object
    // },
})


module.exports = mongoose.model('Message', messageSchema)