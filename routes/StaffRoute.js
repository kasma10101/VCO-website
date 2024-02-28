const express = require("express");
const StaffController = require("../controllers/StaffController");

const allStaff = StaffController.allStaff;
const createStaff = StaffController.createStaff;
const deleteStaff = StaffController.deleteStaff;
const updateStaff = StaffController.updateStaff;
const StaffRoute = express.Router();

 StaffRoute.post('/create-staff',createStaff);
StaffRoute.get('/all-staff',allStaff);
StaffRoute.post('/update-staff',updateStaff);
StaffRoute.delete('delete-staff',deleteStaff);


module.exports = StaffRoute;
