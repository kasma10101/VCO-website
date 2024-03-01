const  Blog  = require("../model/Blog.js");

const displayBlog = async(req,res) => {
    return res.render('dashboard/createBlog',{value:''})
}
 const createBlog = async (req,res)=>{
    const {
        link,
        image,
        text,
    } = req.body;
    
    try {
        const updateData = {
            link: link,
            text:text
        };
        
        if (req.file) {
            updateData.image = req.file.filename;
        }
        console.log(updateData,'here in the creating')
        const blog = new Blog (updateData)
        const savedBlog = await blog.save();

        if (!savedBlog) {
            return res.status(500).json(' cannot be created');
          }
          return res.redirect('/blog/all-blog');
      

    } catch (error) {
        console.log(error)
    }
}
const update =  async (req, res) => {
    try {
        const id = req.params.id;
        const value = await Blog.findById(id);
        res.render('dashboard/createBlog', { value});
    } catch (error) {
        res.status(500).send('Error: ' + error.message);
    }
};

 const updateBlog = async(req,res,next) =>{

    const {   
        image,
       text,
        link,
    } = req.body;
    const {id} = req.params;
      
    try {
        const updateData = {
           text:text,
            link:link,
        };
        
        if (req.file) {
            updateData.image = req.file.filename;
        }
        // console.log(updateData,'here is Blog')

    const blog = await Blog.findByIdAndUpdate(id,updateData,{new:true})    
    if(!blog){
     return res.status(500).json({message:"error while saving"});
    }

return res.redirect('/blog/all-blog')
} catch (error) {
        return res.status(500).json({message:error.message})
    }
}

 const allBlog = async(req,res) =>{
    let blogs;
    try {
       blogs = await Blog.find()
    } catch (error) {
        return res.status(500).json({message:"server error"})
    }
    if(!blogs){
        return res.status(404).json({message:"no Blog"})
    }
    return res.render('dashboard/Blog',{blogs});
}


 const deleteBlog = async(req,res) =>{
    const id = req.params.id 
    try {
        const deleted = await Blog.findByIdAndDelete(id);
        if(!deleted){
            return res.json({message:"Blog  doesn't exist"})
        }
            
 return res.redirect('/blog/all-blog')
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = {deleteBlog,displayBlog,update,allBlog,updateBlog,createBlog}