const express = require("express");
const StaffController = require("../controllers/StaffController");

const allStaff = StaffController.allStaff;
const createStaff = StaffController.createStaff;
const deleteStaff = StaffController.deleteStaff;
const updateStaff = StaffController.updateStaff;
const displayStaff = StaffController.displayStaff;
const StaffRoute = express.Router();

 StaffRoute.post('/create-staff',createStaff);
StaffRoute.get('/all-staff',allStaff);
StaffRoute.get('/display-staff',displayStaff);
StaffRoute.post('/update-staff/:id',updateStaff);
StaffRoute.delete('/delete-staff/:id',deleteStaff);


module.exports = StaffRoute;
