import { Router } from 'express';
const router = Router();
import { 
    getAllInsuranceContracts, 
    getInsuranceContractById, 
    createInsuranceContract, 
    updateInsuranceContract, 
    deleteInsuranceContract 
} from '../controllers/InsuranceContractController.js';

router.get('/', getAllInsuranceContracts);
router.get('/:id', getInsuranceContractById);
router.post('/', createInsuranceContract);
router.put('/:id', updateInsuranceContract);
router.delete('/:id', deleteInsuranceContract);

export default router;
