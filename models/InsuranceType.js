const mongoose = require('mongoose');

const insuranceTypeSchema = new mongoose.Schema({
    insuranceTypeName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100,
        unique: true
    },
    agentPercentage: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    }
});

const InsuranceType = mongoose.model('InsuranceType', insuranceTypeSchema);

module.exports = InsuranceType;
