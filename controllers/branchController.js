import Branch from '../models/Branch.js';

/**
 * @async
 * @function getAllBranches
 * @description Get all branches from the database.
 * @param {object} request - Express request object.
 * @param {object} response - Express response object.
 * @returns {Promise<void>} - Sends a JSON response with all branches or an error message.
 * @throws {Error} - If there is an error while fetching branches.
 */
export async function getAllBranches(request, response) {
    try {
        const branches = await Branch.find();
        response.status(200).json(branches);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

/**
 * @async
 * @function getBranchById
 * @description Get a branch by its ID.
 * @param {object} request - Express request object.
 * @param {object} response - Express response object.
 * @returns {Promise<void>} - Sends a JSON response with the branch data or an error message.
 */
export async function getBranchById(request, response) {
    try {
        const branch = await Branch.findById(request.params.id);
        if (!branch) {
            return response.status(404).json({ message: 'Branch not found' });
        }
        response.status(200).json(branch);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

/**
 * @async
 * @function createBranch
 * @description Create a new branch.
 * @param {object} request - Express request object. Expects branch data in the request body.
 * @param {object} response - Express response object.
 * @returns {Promise<void>} - Sends a JSON response with the newly created branch or an error message.
 */
export async function createBranch(request, response) {
    const branch = new Branch({
        branchName: request.body.branchName,
        address: request.body.address,
        phoneNumber: request.body.phoneNumber
    });

    try {
        const newBranch = await branch.save();
        response.status(201).json(newBranch);
    } catch (error) {
        response.status(400).json({ message: error.message });
    }
}

/**
 * @async
 * @function updateBranch
 * @description Update an existing branch by its ID.
 * @param {object} request - Express request object. Expects branch ID in params and updated branch data in the request body.
 * @param {object} response - Express response object.
 * @returns {Promise<void>} - Sends a JSON response with the updated branch data or an error message.
 */
export async function updateBranch(request, response) {
    try {
        const branch = await Branch.findById(request.params.id);
        if (!branch) {
            return response.status(404).json({ message: 'Branch not found' });
        }

        if (request.body.branchName) {
            branch.branchName = request.body.branchName;
        }
        if (request.body.address) {
            branch.address = request.body.address;
        }
        if (request.body.phoneNumber) {
            branch.phoneNumber = request.body.phoneNumber;
        }

        const updatedBranch = await branch.save();
        response.status(200).json(updatedBranch);
    } catch (error) {
        response.status(400).json({ message: error.message });
    }
}

/**
 * @async
 * @function deleteBranch
 * @description Delete a branch by its ID.
 * @param {object} request - Express request object. Expects branch ID in params.
 * @param {object} response - Express response object.
 * @returns {Promise<void>} - Sends a JSON response indicating successful deletion or an error message.
 */
export async function deleteBranch(request, response) {
    try {
        const branch = await Branch.findByIdAndDelete(request.params.id);
        if (!branch) {
            return response.status(404).json({ message: 'Branch not found' });
        }
        response.status(200).json({ message: 'Branch deleted' });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}
