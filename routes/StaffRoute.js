const express = require("express");
const StaffController = require("../controllers/StaffController");

const allStaff = StaffController.allStaff;
const createStaff = StaffController.createStaff;
const deleteStaff = StaffController.deleteStaff;
const updateStaff = StaffController.updateStaff;
const index = StaffController.index;
const displayStaff = StaffController.displayStaff;
const update = StaffController.update;
const StaffRoute = express.Router();

 StaffRoute.post('/create-staff',createStaff);
StaffRoute.get('/all-staff',allStaff);
StaffRoute.get('/display-staff',displayStaff);
StaffRoute.get('/',index);
StaffRoute.get('/display-edit/:id',update);
StaffRoute.post('/update-staff/:id',updateStaff);
StaffRoute.delete('/delete-staff/:id',deleteStaff);


module.exports = StaffRoute;
