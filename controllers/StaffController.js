const  Staff  = require("../model/Staff.js");

const displayStaff = async(req,res) => {
    return res.render('/dashboard/createStaff')
}
 const createStaff = async (req,res)=>{
    const {
        name,
        image,
        role,
    } = req.body;
    if(!name || !role){
       return res.status(500).json({message:"please provide all information"})
    }
    try {
        const updateData = {
            name: name,
            role: role
        };
        
        if (req.file) {
            updateData.image = req.file.filename;
        }
  
         console.log(req.file.filename,'imge')
const staff = new Staff (updateData)
        const savedStaff = await staff.save();

        if (!savedStaff) {
            return res.redirect('dashboard/createStaff');
          }
          return res.redirect('/staff/all-staff');
      

    } catch (error) {
        console.log(error)
    }
}

 const update =  async (req, res) => {
    try {
        const id = req.params.id;
        const value = await Staff.findById(id);
        res.render('dashboard/createStaff', { value});
    } catch (error) {
        res.status(500).send('Error: ' + error.message);
    }
};
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

return res.redirect('dashboard/Staff')
} catch (error) {
        return res.status(500).json({message:error.message})
    }
}

 const allStaff = async(req,res) =>{
    let staffs;
    try {
       staffs = await Staff.find()
    } catch (error) {
        return res.status(500).json({message:"server error"})
    }
    if(!staffs){
        return res.status(404).json({message:"no Staff"})
    }
    return res.render('dashboard/Staff',{staffs});
}


 const deleteStaff = async(req,res) =>{
    const id = req.params.id 
    try {
        const deleted = await Staff.findByIdAndDelete(id);
        if(!deleted){
            return res.redirect('/staff/all-staff');
        }
            
        return res.redirect('/staff/all-staff');
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = {deleteStaff,allStaff,update,updateStaff,displayStaff,createStaff}