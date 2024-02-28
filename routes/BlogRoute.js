const express = require("express");
const BlogController = require("../controllers/BlogController");

const allBlog = BlogController.allBlog;
const createBlog = BlogController.createBlog;
const deleteBlog = BlogController.deleteBlog;
const updateBlog = BlogController.updateBlog;
const BlogRoute = express.Router();

 BlogRoute.post('/create-blog',createBlog);
BlogRoute.get('/all-blog',allBlog);
BlogRoute.post('/update-blog/:id',updateBlog);
BlogRoute.delete('/delete-blog/:id',deleteBlog);


module.exports = BlogRoute;
