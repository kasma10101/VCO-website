const mongoose = require('mongoose')

const StaffSchema = new mongoose.Schema({
    name:{
        type:String
    },
    role:{
        type:String
    },
    image:{
        type:String
    }
})

module.exports =mongoose.model('Staff', StaffSchema);