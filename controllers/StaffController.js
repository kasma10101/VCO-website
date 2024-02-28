const  Staff  = require("../model/Staff.js");

const displayStaff = async(req,res) => {
     res.render('dashboard/create-staff')
}
 const createStaff = async (req,res)=>{
    const {
        name,
        image,
        role,
    } = req.body;
    
    try {
        const updateData = {
            name: name,
            role:role
        };
        
        if (req.file) {
            updateData.image = req.file.filename;
        }
const staff = new Staff (updateData)
        const savedStaff = await staff.save();

        if (!savedStaff) {
            return res.status(500).json(' cannot be created');
          }
          return res.status(201).json(' created');
      

    } catch (error) {
        console.log(error)
    }
}

 const updateStaff = async(req,res,next) =>{

    const {   
        image,
       role,
        name,
    } = req.body;
    const {id} = req.params;
      
    try {
        const updateData = {
           role:role,
            name:name,
        };
        
        if (req.file) {
            updateData.image = req.file.filename;
        }
        console.log(updateData,'here is staff')

    const staff = await Staff.findByIdAndUpdate(id,updateData,{new:true})    
    if(!staff){
     return res.status(500).json({message:"error while saving"});
    }

return res.status(200).json({message:"updated Staff",staff})
} catch (error) {
        return res.status(500).json({message:error.message})
    }
}

 const allStaff = async(req,res) =>{
    let staff;
    try {
       staff = await Staff.find()
    } catch (error) {
        return res.status(500).json({message:"server error"})
    }
    if(!staff){
        return res.status(404).json({message:"no Staff"})
    }
    return res.status(200).json(staff);
}


 const deleteStaff = async(req,res) =>{
    const id = req.params.id 
    try {
        const deleted = await Staff.findByIdAndDelete(id);
        if(!deleted){
            return res.json({message:"Staff  doesn't exist"})
        }
            
 return res.status(200).json({message:"Staff deleted"})
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = {deleteStaff,allStaff,updateStaff,displayStaff,createStaff}