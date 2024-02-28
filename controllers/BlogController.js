const  Blog  = require("../model/Blog.js");

 const createBlog = async (req,res)=>{
    const {
        title,
        image,
        content,
    } = req.body;
    
    try {
        const updateData = {
            title: title,
            content:content
        };
        
        if (req.file) {
            updateData.image = req.file.filename;
        }
const blog = new Blog (updateData)
        const savedBlog = await blog.save();

        if (!savedBlog) {
            return res.status(500).json(' cannot be created');
          }
          return res.status(201).json(' created');
      

    } catch (error) {
        console.log(error)
    }
}

 const updateBlog = async(req,res,next) =>{

    const {   
        image,
       content,
        title,
    } = req.body;
    const {id} = req.params;
      
    try {
        const updateData = {
           content:content,
            title:title,
        };
        
        if (req.file) {
            updateData.image = req.file.filename;
        }
        // console.log(updateData,'here is Blog')

    const blog = await Blog.findByIdAndUpdate(id,updateData,{new:true})    
    if(!blog){
     return res.status(500).json({message:"error while saving"});
    }

return res.status(200).json({message:"updated Blog",blog})
} catch (error) {
        return res.status(500).json({message:error.message})
    }
}

 const allBlog = async(req,res) =>{
    let blog;
    try {
       blog = await Blog.find()
    } catch (error) {
        return res.status(500).json({message:"server error"})
    }
    if(!blog){
        return res.status(404).json({message:"no Blog"})
    }
    return res.status(200).json(blog);
}


 const deleteBlog = async(req,res) =>{
    const id = req.params.id 
    try {
        const deleted = await Blog.findByIdAndDelete(id);
        if(!deleted){
            return res.json({message:"Blog  doesn't exist"})
        }
            
 return res.status(200).json({message:"Blog deleted"})
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = {deleteBlog,allBlog,updateBlog,createBlog}