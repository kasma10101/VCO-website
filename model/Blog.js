const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
    text:{
        type:String
    },
    link:{
        type:String
    },
    image:{
        type:String
    }
})

module.exports =mongoose.model('Blog', BlogSchema);