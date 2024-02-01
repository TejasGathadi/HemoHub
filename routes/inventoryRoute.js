const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { createInventoryController, getInventoryController, getDonarController, getHospitalController, getOrganizationController, getOrganizationForHospitalController, getInventoryHospitalController, getRecentInventoryController } = require("../controllers/inventoryController");

const router = express.Router();

// routes

// ADD INVENTORY || POST
router.post("/create-inventory", authMiddleware, createInventoryController);


// GET ALL BLOOD RECORDS
router.get('/get-inventory', authMiddleware, getInventoryController)


// GET RECENT # BLOOD RECORDS
router.get('/get-recent-inventory', authMiddleware, getRecentInventoryController)


// GET HOSPITAL BLOOD RECORDS
router.post('/get-inventory-hospital', authMiddleware, getInventoryHospitalController)


// GET DONAR RECORDS
router.get('/get-donar', authMiddleware, getDonarController)


// GET HOSPITALS RECORDS
router.get('/get-hospitals', authMiddleware, getHospitalController)


// GET ORGANIZATION RECORDS
router.get('/get-organization', authMiddleware, getOrganizationController)


// GET HOSPITAL RECORDS
router.get('/get-organization-for-hospital', authMiddleware, getOrganizationForHospitalController)




module.exports = router