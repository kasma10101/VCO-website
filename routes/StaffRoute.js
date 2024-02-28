import express from "express"
import { allStaff, createStaff, deleteStaff, updateStaff } from "../controllers/StaffController";

const StaffRoute = express.Router();

StaffRoute.post('/create-staff',createStaff);
StaffRoute.get('/all-staff',allStaff);
StaffRoute.post('/update-staff',updateStaff);
StaffRoute.delete('delete-staff',deleteStaff);