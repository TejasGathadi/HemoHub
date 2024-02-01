const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { getDonarsListController, getHospitalListController, getOrganizationListController, deleteDonarController, deleteHospitalController, deleteOrganizationController } = require("../controllers/adminController");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();


// Routes

// get donar list
router.get('/donar-list', authMiddleware, adminMiddleware, getDonarsListController);

// get hospital list
router.get('/hospital-list', authMiddleware, adminMiddleware, getHospitalListController);

// get organization list
router.get('/org-list', authMiddleware, adminMiddleware, getOrganizationListController);


// -------------------------------------------------

// delete donar
router.delete('/delete-donar/:id', authMiddleware, adminMiddleware, deleteDonarController)

// delete hospital
router.delete('/delete-hospital/:id', authMiddleware, adminMiddleware, deleteHospitalController)

// delete organization
router.delete('/delete-organization/:id', authMiddleware, adminMiddleware, deleteOrganizationController)



// EXPORT
module.exports = router;