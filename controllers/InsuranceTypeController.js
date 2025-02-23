import InsuranceType from "../models/InsuranceType.js";

/**
 * @async
 * @function getAllInsuranceTypes
 * @description Get all insurance types from the database.
 * @param {object} request - Express request object.
 * @param {object} response - Express response object.
 * @returns {Promise<void>} - Sends a JSON response with an array of all insurance types or an error message.
 * @throws {Error} - If there is an error while fetching insurance types.
 */
export async function getAllInsuranceTypes(request, response) {
    try {
        const insuranceTypes = await InsuranceType.find();
        response.status(200).json(insuranceTypes);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

/**
 * @async
 * @function getInsuranceTypeById
 * @description Get an insurance type by its ID.
 * @param {object} request - Express request object. Expects insurance type ID in params.
 * @param {object} response - Express response object.
 * @returns {Promise<void>} - Sends a JSON response with the insurance type data or an error message.
 */
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

/**
 * @async
 * @function createInsuranceType
 * @description Create a new insurance type.
 * @param {object} request - Express request object. Expects insurance type data in the request body.
 * @param {object} response - Express response object.
 * @returns {Promise<void>} - Sends a JSON response with the newly created insurance type or an error message.
 */
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

/**
 * @async
 * @function updateInsuranceType
 * @description Update an existing insurance type by its ID.
 * @param {object} request - Express request object. Expects insurance type ID in params and updated type data in the request body.
 * @param {object} response - Express response object.
 * @returns {Promise<void>} - Sends a JSON response with the updated insurance type data or an error message.
 */
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

/**
 * @async
 * @function deleteInsuranceType
 * @description Delete an insurance type by its ID.
 * @param {object} request - Express request object. Expects insurance type ID in params.
 * @param {object} response - Express response object.
 * @returns {Promise<void>} - Sends a JSON response indicating successful deletion or an error message.
 */
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
