import Branch from '../models/Branch.js';

export async function getAllBranches(request, response) {
    try {
        const branches = await Branch.find();
        response.status(200).json(branches);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

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
