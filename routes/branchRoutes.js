import { Router } from 'express';
const router = Router();
import { 
    getAllBranches, 
    getBranchById, 
    createBranch, 
    updateBranch, 
    deleteBranch 
} from '../controllers/branchController.js';

router.get('/', getAllBranches); 
router.get('/:id', getBranchById);
router.post('/', createBranch);
router.put('/:id', updateBranch);
router.delete('/:id', deleteBranch);

export default router;
