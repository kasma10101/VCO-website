import mongoose from "mongoose";

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

export const Staff = mongoose.model('Staff', StaffSchema);

