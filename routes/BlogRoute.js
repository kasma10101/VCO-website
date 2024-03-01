const express = require("express");
const BlogController = require("../controllers/BlogController");

const allBlog = BlogController.allBlog;
const createBlog = BlogController.createBlog;
const deleteBlog = BlogController.deleteBlog;
const updateBlog = BlogController.updateBlog;
const displayBlog = BlogController.displayBlog;
const update = BlogController.update;
const BlogRoute = express.Router();

 BlogRoute.post('/create-blog',createBlog);
BlogRoute.get('/all-blog',allBlog);
BlogRoute.get('/display-blog',displayBlog);
BlogRoute.get('/display-edit/:id',update);
BlogRoute.post('/update-blog/:id',updateBlog);
BlogRoute.delete('/delete-blog/:id',deleteBlog);


module.exports = BlogRoute;
