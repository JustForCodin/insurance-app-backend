const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
    branchName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100
    },
    address: {
        type: String,
        required: true,
        trim: true,
        maxLength: 255
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
        maxLength: 20
    }
});

const Branch = mongoose.model('Branch', branchSchema);

module.exports = Branch;