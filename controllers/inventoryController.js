const userModel = require("../models/userModel");
const inventoryModel = require("../models/inventoryModel");
const mongoose = require("mongoose");


const createInventoryController = async (req, res) => {
    try {
        const { email } = req.body
        // validation
        const user = await userModel.findOne({ email })
        if (!user) {
            throw new Error("User not found");
        }

        // if (inventoryType === "in" && user.role !== 'donar') {
        //     throw new Error("Not a Donar");
        // }
        // if (inventoryType === "out" && user.role !== "hospital") {
        //     throw new Error("Not a hospital")
        // }

        if (req.body.inventoryType == 'out') {
            const requestedBloodGroup = req.body.bloodGroup;
            const requestedQuantityOfBloodGroup = req.body.quantity;
            const organization = new mongoose.Types.ObjectId(req.body.userId)

            // calculate blood quantity
            const totalInOfRequestedBlood = await inventoryModel.aggregate([
                {
                    $match: {
                        organization,
                        inventoryType: 'in',
                        bloodGroup: requestedBloodGroup
                    }
                },
                {
                    $group: {
                        _id: '$bloodGroup',
                        total: { $sum: '$quantity' }
                    }
                }
            ]);
            // console.log("Total in", totalInOfRequestedBlood);

            const totalIn = totalInOfRequestedBlood[0]?.total || 0;

            // calculate out Blood Quantity
            const totalOutOfRequestedBlood = await inventoryModel.aggregate([
                {
                    $match: {
                        organization,
                        inventoryType: 'out',
                        bloodGroup: requestedBloodGroup
                    }
                },
                {
                    $group: {
                        _id: '$bloodGroup',
                        total: { $sum: '$quantity' }
                    }
                }
            ]);

            const totalOut = totalOutOfRequestedBlood[0]?.total || 0;

            // in and out calculation
            const availableQuantityOfBloodGroup = totalIn - totalOut;
            if (availableQuantityOfBloodGroup < requestedQuantityOfBloodGroup) {
                return res.status(500).send({
                    success: false,
                    message: `Only ${availableQuantityOfBloodGroup}ML of ${requestedBloodGroup.toUpperCase()} is available`
                })
            }

            req.body.hospital = user?._id;

        } else {
            req.body.donar = user?._id;
        }



        // Save record
        const inventory = new inventoryModel(req.body)
        await inventory.save()
        return res.status(201).send({
            success: true,
            message: 'Record created successfully'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in creating inventory',
            error
        })
    }
};


// GET ALL BLOOD RECORDS
const getInventoryController = async (req, res) => {
    try {
        const inventory = await inventoryModel.find({
            organization: req.body.userId
        }).populate('donar').populate('hospital').sort({ createdAt: -1 })
        return res.status(200).send({
            success: true,
            message: " get all records successfully ",
            inventory
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in getting all inventory'
        })
    }
};


// GET HOSPITAL BLOOD RECORDS
const getInventoryHospitalController = async (req, res) => {
    try {
        const inventory = await inventoryModel
            .find(req.body.filters)
            .populate('donar')
            .populate('hospital')
            .populate('organization')
            .sort({ createdAt: -1 });
        return res.status(200).send({
            success: true,
            message: " get hospital consumer records successfully ",
            inventory
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in consumer inventory inventory'
        })
    }
};


// GET DONAR RECORDS
const getDonarController = async (req, res) => {
    try {
        const organization = req.body.userId;
        // Find Donars
        const donarId = await inventoryModel.distinct("donar", {
            organization
        });
        // console.log(donarId);
        const donars = await userModel.find({ _id: { $in: donarId } })
        return res.status(200).send({
            success: true,
            message: "Donar Record Fetched Successfully",
            donars
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in fetching Donars',
            error
        });
    }
};



// GET HOSPITALS RECORDS
const getHospitalController = async (req, res) => {
    try {
        const organization = req.body.userId;

        // GET HOSPITAL ID
        const hospitalId = await inventoryModel.distinct('hospital', { organization });

        // FIND HOSPITAL
        const hospitals = await userModel.find({
            _id: { $in: hospitalId }
        });
        return res.status(200).send({
            success: true,
            message: "Hospitals Records Fetched Successfully",
            hospitals
        })


    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in fetching Hospitals',
            error
        })
    }

};


// GET ORGANIZATIONS DATA
const getOrganizationController = async (req, res) => {
    try {
        const donar = req.body.userId;
        const orgId = await inventoryModel.distinct('organization', { donar });

        // FIND ORG
        const orgData = await userModel.find({
            _id: { $in: orgId }
        })
        return res.status(200).send({
            success: true,
            message: "Organizations Data Fetched Successfully",
            orgData
        });


    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in getting Organizations Data',
            error
        })
    }
};


// GET HOSPITAL DATA
const getOrganizationForHospitalController = async (req, res) => {
    try {
        const hospital = req.body.userId;
        const orgId = await inventoryModel.distinct('organization', { hospital });

        // FIND HOSPITAL
        const orgData = await userModel.find({
            _id: { $in: orgId }
        })
        return res.status(200).send({
            success: true,
            message: "Hospital Data Fetched Successfully",
            orgData
        });


    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in getting Hospital Data',
            error
        })
    }
};


// GET BLOOD RECORDS OF 3
const getRecentInventoryController = async (req, res) => {
    try {
        const inventory = await inventoryModel.find({
            organization: req.body.userId
        }).limit(3).sort({ createdAt: -1 })
        return res.status(200).send({
            success: true,
            message: "recent inventory Data",
            inventory
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in fetching recent Inventories',
            error
        })
    }
};


module.exports = {
    createInventoryController,
    getInventoryController,
    getDonarController,
    getHospitalController,
    getOrganizationController,
    getOrganizationForHospitalController,
    getInventoryHospitalController,
    getRecentInventoryController
};