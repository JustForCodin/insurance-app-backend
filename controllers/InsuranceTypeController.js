import InsuranceType from "../models/InsuranceType.js";

export async function getAllInsuranceTypes(request, response) {
    try {
        const insuranceTypes = await InsuranceType.find();
        response.status(200).json(insuranceTypes);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

export async function getInsuranceTypeById(request, response) {
    try {
        const insuranceType = await InsuranceType.findById(request.params.id);
        if (!insuranceType) {
            return response.status(404).json({ message: 'Insurance type not found' });
        }
        response.status(200).json(insuranceType);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

export async function createInsuranceType(request, response) {
    const insuranceType = new InsuranceType({
        insuranceTypeName: request.body.insuranceTypeName,
        agentPercentage: request.body.agentPercentage
    });

    try {
        const newInsuranceType = await insuranceType.save();
        response.status(201).json(newInsuranceType);
    } catch (error) {
        response.status(400).json({ message: error.message });
    }
}

export async function updateInsuranceType(request, response) {
    try {
        const insuranceType = await InsuranceType.findById(request.params.id);
        if (!insuranceType) {
            return response.status(404).json({ message: 'Insurance type not found' });
        }

        if (request.body.insuranceTypeName) {
            insuranceType.insuranceTypeName = request.body.insuranceTypeName;
        }
        if (request.body.agentPercentage) {
            insuranceType.agentPercentage = request.body.agentPercentage;
        }

        const updatedInsuranceType = await insuranceType.save();
        response.status(200).json(updatedInsuranceType);
    } catch (error) {
        response.status(400).json({ message: error.message });
    }
}

export async function deleteInsuranceType(request, response) {
    try {
        const insuranceType = await InsuranceType.findByIdAndDelete(request.params.id);
        if (!insuranceType) {
            return response.status(404).json({ message: 'Insurance type not found' });
        }
        response.status(200).json({ message: 'Insurance type deleted' });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}
