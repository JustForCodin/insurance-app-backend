const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const insuranceAgentSchema = new mongoose.Schema({
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    middleName: {
        type: String,
        trim: true,
        maxLength: 50
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
    },
    branch: {
        type: Schema.Types.ObjectId,
        ref: 'Branch',
        required: true
    }
});

const InsuranceAgent = mongoose.model('InsuranceAgent', insuranceAgentSchema);

module.exports = InsuranceAgent;
