import InsuranceAgent from '../models/InsuranceAgent.js';

export async function getAllInsuranceAgents(request, response) {
    try {
        const insuranceAgents = await InsuranceAgent
            .find()
            .populate('branch', 'branchName');
        response.status(200).json(insuranceAgents);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

export async function getInsuranceAgentById(request, response) {
    try {
        const insuranceAgent = await InsuranceAgent
            .findById(request.params.id)
            .populate('branch', 'branchName'); 
        if (!insuranceAgent) {
            return response.status(404).json({ message: 'Insurance agent not found' });
        }
        response.status(200).json(insuranceAgent);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

export async function createInsuranceAgent(request, response) {
    const insuranceAgent = new InsuranceAgent({
        lastName: request.body.lastName,
        firstName: request.body.firstName,
        middleName: request.body.middleName,
        address: request.body.address,
        phoneNumber: request.body.phoneNumber,
        branch: request.body.branchId
    });

    try {
        const newInsuranceAgent = await insuranceAgent.save();
        response.status(201).json(newInsuranceAgent);
    } catch (error) {
        response.status(400).json({ message: error.message });
    }
}

export async function updateInsuranceAgent(request, response) {
    try {
        const insuranceAgent = await InsuranceAgent.findById(request.params.id);
        if (!insuranceAgent) {
            return response.status(404).json({ message: 'Insurance agent not found' });
        }

        if (request.body.lastName) {
            insuranceAgent.lastName = request.body.lastName;
        }
        if (request.body.firstName) {
            insuranceAgent.firstName = request.body.firstName;
        }
        if (request.body.middleName) {
            insuranceAgent.middleName = request.body.middleName;
        }
        if (request.body.address) {
            insuranceAgent.address = request.body.address;
        }
        if (request.body.phoneNumber) {
            insuranceAgent.phoneNumber = request.body.phoneNumber;
        }
        if (request.body.branchId) {
            insuranceAgent.branch = request.body.branchId;
        }

        const updatedInsuranceAgent = await insuranceAgent.save();
        response.status(200).json(updatedInsuranceAgent);
    } catch (error) {
        response.status(400).json({ message: error.message });
    }
}

export async function deleteInsuranceAgent(request, response) {
    try {
        const insuranceAgent = await InsuranceAgent.findByIdAndDelete(request.params.id);
        if (!insuranceAgent) {
            return response.status(404).json({ message: 'Insurance agent not found' });
        }
        response.status(200).json({ message: 'Insurance agent deleted' });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}
