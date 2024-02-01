const userModel = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");



const registerController = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ email: req.body.email })

        // Validation 
        if (existingUser) {
            return res.status(200).send({
                success: true,
                message: 'User Already exists'

            })
        }


        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        req.body.password = hashedPassword

        // rest Data
        const user = new userModel(req.body)
        await user.save()
        return res.status(201).send({
            success: true,
            message: 'user registered successfully',
            user
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Register API",
            error
        })
    }
};


// LOGIN CALLBACK
const loginController = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email })

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            })
        }

        // role check
        if(user.role !== req.body.role){
            return res.status(500).send({
                success: false,
                message:'role dosent match'
            })
        }

        // Compare password
        const comparePassword = await bcrypt.compare(req.body.password, user.password)
        if (!comparePassword) {
            return res.status(500).send({
                success: false,
                message: "Incorrect Password"
            })
        }


        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        return res.status(200).send({
            success: true,
            message: "Login Successfully!",
            token,
            user
        })



    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: true,
            message: "Error in Login Api",
            error
        })
    }
};


// get current user
const currentUserController = async (req, res)=>{
    try {
        const user = await userModel.findOne({_id: req.body.userId})
        return res.status(200).send({
            success: true,
            message: "User Fetched Successfully",
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'unable to connect user',
            error
        })
    }
};









module.exports = { 
    registerController, 
    loginController, 
    currentUserController 
};