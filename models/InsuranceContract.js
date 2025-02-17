const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const insuranceContractSchema = new mongoose.Schema({
    contractNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxLength: 50
    },
    contractDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    insuranceAmount: {
        type: Number,
        required: true,
        min: 0
    },
    tariffRate: {
        type: Number,
        required: true,
        min: 0
    },
    branch: {
        type: Schema.Types.ObjectId,
        ref: 'Branch',
        required: true
    },
    insuranceType: {
        type: Schema.Types.ObjectId,
        ref: 'InsuranceType',
        required: true
    },
    agent: {
        type: Schema.Types.ObjectId,
        ref: 'InsuranceAgent',
        required: true
    }
});

const InsuranceContract = mongoose.model('InsuranceContract', insuranceContractSchema);

module.exports = InsuranceContract;
