import InsuranceContract from '../models/InsuranceContract.js';

export async function getAllInsuranceContracts(request, response) {
    try {
        const insuranceContracts = await InsuranceContract.find()
            .populate('branch', 'branchName')
            .populate('insuranceType', 'insuranceTypeName agentPercentage')
            .populate('agent', 'lastName firstName middleName');
        response.status(200).json(insuranceContracts);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

export async function getInsuranceContractById(request, response) {
    try {
        const insuranceContract = await InsuranceContract.findById(request.params.id)
            .populate('branch', 'branchName')
            .populate('insuranceType', 'insuranceTypeName agentPercentage')
            .populate('agent', 'lastName firstName middleName');
        if (!insuranceContract) {
            return response.status(404).json({ message: 'Insurance contract not found' });
        }
        response.status(200).json(insuranceContract);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

export async function createInsuranceContract(request, response) {
    const insuranceContract = new InsuranceContract({
        contractNumber: request.body.contractNumber,
        contractDate: request.body.contractDate,
        insuranceAmount: request.body.insuranceAmount,
        tariffRate: request.body.tariffRate,
        branch: request.body.branchId,
        insuranceType: request.body.insuranceTypeId,
        agent: request.body.agentId
    });

    try {
        const newInsuranceContract = await insuranceContract.save();
        response.status(201).json(newInsuranceContract);
    } catch (error) {
        response.status(400).json({ message: error.message });
    }
}

export async function updateInsuranceContract(request, response) {
    try {
        const insuranceContract = await InsuranceContract.findById(request.params.id);
        if (!insuranceContract) {
            return response.status(404).json({ message: 'Insurance contract not found' });
        }

        if (request.body.contractDate) {
            insuranceContract.contractDate = request.body.contractDate;
        }
        if (request.body.insuranceAmount) {
            insuranceContract.insuranceAmount = request.body.insuranceAmount;
        }
        if (request.body.tariffRate) {
            insuranceContract.tariffRate = request.body.tariffRate;
        }
        if (request.body.branchId) {
            insuranceContract.branch = request.body.branchId;
        }
        if (request.body.insuranceTypeId) {
            insuranceContract.insuranceType = request.body.insuranceTypeId;
        }
        if (request.body.agentId) {
            insuranceContract.agent = request.body.agentId;
        }

        const updatedInsuranceContract = await insuranceContract.save();
        response.status(200).json(updatedInsuranceContract);
    } catch (error) {
        response.status(400).json({ message: error.message });
    }
}

export async function deleteInsuranceContract(request, response) {
    try {
        const insuranceContract = await InsuranceContract.findByIdAndDelete(request.params.id);
        if (!insuranceContract) {
            return response.status(404).json({ message: 'Insurance contract not found' });
        }
        response.status(200).json({ message: 'Insurance contract deleted' });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

export async function calculateAgentSalary(insuranceContractId) {
    try {
        const insuranceContract = await InsuranceContract.findById(insuranceContractId)
            .populate('insuranceType', 'agentPercentage');

        if (!insuranceContract) {
            throw new Error('Insurance contract bot found');
        }

        const insurancePayment = insuranceContract.insuranceAmount * insuranceContract.tariffRate;
        const agentPercentage = insuranceContract.insuranceType.agentPercentage / 100;
        const agentSalary = insurancePayment * agentPercentage;

        return agentSalary;

    } catch (error) {
        throw new Error(`Salary evaluation error: ${error.message}`);
    }
}
