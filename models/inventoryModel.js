const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
    inventoryType: {
        type: String,
        require: [true, 'inventory type required'],
        enum: ['in', 'out']
    },
    bloodGroup: {
        type: String,
        require: [true, 'blood group is required'],
        enum: ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-']
    },
    quantity: {
        type: Number,
        require: [true, 'quantity is required'],

    },
    email: {
        type: String,
        require: [true, 'Donor email is required'],
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        require: [true, 'organization is required']
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        require: function () {
            return this.inventoryType === "out"
        }
    },
    donar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        require: function () {
            return this.inventoryType === "in";
        }
    }
}, { timestamps: true });



module.exports = mongoose.model('Inventory', inventorySchema)