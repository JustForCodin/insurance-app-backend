import InsuranceAgent from '../models/InsuranceAgent.js';

/**
 * @async
 * @function getAllInsuranceAgents
 * @description Get all insurance agents from the database, populating the 'branch' field with 'branchName'.
 * @param {object} request - Express request object.
 * @param {object} response - Express response object.
 * @returns {Promise<void>} - Sends a JSON response with an array of all insurance agents or an error message.
 * @throws {Error} - If there is an error while fetching insurance agents.
 */
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

/**
 * @async
 * @function getInsuranceAgentById
 * @description Get an insurance agent by their ID, populating the 'branch' field with 'branchName'.
 * @param {object} request - Express request object. Expects agent ID in params.
 * @param {object} response - Express response object.
 * @returns {Promise<void>} - Sends a JSON response with the insurance agent data or an error message.
 */
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

/**
 * @async
 * @function createInsuranceAgent
 * @description Create a new insurance agent.
 * @param {object} request - Express request object. Expects insurance agent data in the request body.
 * @param {object} response - Express response object.
 * @returns {Promise<void>} - Sends a JSON response with the newly created insurance agent or an error message.
 */
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

/**
 * @async
 * @function updateInsuranceAgent
 * @description Update an existing insurance agent by their ID.
 * @param {object} request - Express request object. Expects insurance agent ID in params and updated agent data in the request body.
 * @param {object} response - Express response object.
 * @returns {Promise<void>} - Sends a JSON response with the updated insurance agent data or an error message.
 */
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

/**
 * @async
 * @function deleteInsuranceAgent
 * @description Delete an insurance agent by their ID.
 * @param {object} request - Express request object. Expects insurance agent ID in params.
 * @param {object} response - Express response object.
 * @returns {Promise<void>} - Sends a JSON response indicating successful deletion or an error message.
 */
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
