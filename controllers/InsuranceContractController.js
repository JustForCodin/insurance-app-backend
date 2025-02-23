import InsuranceContract from '../models/InsuranceContract.js';

/**
 * @async
 * @function getAllInsuranceContracts
 * @description Get all insurance contracts from the database, populating 'branch', 'insuranceType', and 'agent' fields.
 * @param {object} request - Express request object.
 * @param {object} response - Express response object.
 * @returns {Promise<void>} - Sends a JSON response with an array of all insurance contracts or an error message.
 * @throws {Error} - If there is an error while fetching insurance contracts.
 */
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

/**
 * @async
 * @function getInsuranceContractById
 * @description Get an insurance contract by its ID, populating 'branch', 'insuranceType', and 'agent' fields.
 * @param {object} request - Express request object. Expects contract ID in params.
 * @param {object} response - Express response object.
 * @returns {Promise<void>} - Sends a JSON response with the insurance contract data or an error message.
 */
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

/**
 * @async
 * @function createInsuranceContract
 * @description Create a new insurance contract.
 * @param {object} request - Express request object. Expects insurance contract data in the request body.
 * @param {object} response - Express response object.
 * @returns {Promise<void>} - Sends a JSON response with the newly created insurance contract or an error message.
 */
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

/**
 * @async
 * @function updateInsuranceContract
 * @description Update an existing insurance contract by its ID.
 * @param {object} request - Express request object. Expects insurance contract ID in params and updated contract data in the request body.
 * @param {object} response - Express response object.
 * @returns {Promise<void>} - Sends a JSON response with the updated insurance contract data or an error message.
 */
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

/**
 * @async
 * @function deleteInsuranceContract
 * @description Delete an insurance contract by its ID.
 * @param {object} request - Express request object. Expects insurance contract ID in params.
 * @param {object} response - Express response object.
 * @returns {Promise<void>} - Sends a JSON response indicating successful deletion or an error message.
 */
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

/**
 * @async
 * @function calculateAgentSalary
 * @description Calculates the salary for an insurance agent based on a specific insurance contract.
 * @param {string} insuranceContractId - ID of the insurance contract to calculate salary for.
 * @returns {Promise<number>} - A Promise that resolves to the calculated agent salary (number).
 * @throws {Error} - If the insurance contract is not found or if there is an error during salary evaluation.
 */
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
