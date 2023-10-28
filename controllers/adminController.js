const userModel = require("../models/userModel");

//GET DONAR LIST
const getDonarsListController = async (req, res) => {
    try {
        const donarData = await userModel.find({ role: 'donar' }).sort({ createdAt: -1 });
        return res.status(200).send({
            success: true,
            totalCount: donarData.length,
            message: "Successfully fetched the list of all Donar users",
            donarData
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in Donar API",
            error
        })
    }
};


//GET Hospital LIST
const getHospitalListController = async (req, res) => {
    try {
        const hospitalData = await userModel.find({ role: 'hospital' }).sort({ createdAt: -1 });
        return res.status(200).send({
            success: true,
            totalCount: hospitalData.length,
            message: "Successfully fetched the list of all Hospital users",
            hospitalData
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in Hospital API",
            error
        })
    }
};


//GET Hospital LIST
const getOrganizationListController = async (req, res) => {
    try {
        const organizationData = await userModel.find({ role: 'organization' }).sort({ createdAt: -1 });
        return res.status(200).send({
            success: true,
            totalCount: organizationData.length,
            message: "Successfully fetched the list of all Organization users",
            organizationData
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in Organization API",
            error
        })
    }
};

// -----------------------------------------------------------

// DELETE DONAR
const deleteDonarController = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            success: true,
            message: "Donar Record Deleted Successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in deleting donor",
            error
        })
    }
}



// DELETE Hospital
const deleteHospitalController = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            success: true,
            message: "Hospital Record Deleted Successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in deleting Hospital",
            error
        })
    }
}

// DELETE Organization
const deleteOrganizationController = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            success: true,
            message: "Organization Record Deleted Successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in deleting Organization",
            error
        })
    }
}



module.exports = {
    getDonarsListController,
    getHospitalListController,
    getOrganizationListController,
    deleteDonarController,
    deleteHospitalController,
    deleteOrganizationController,
}