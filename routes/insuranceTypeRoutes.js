import { Router } from 'express';
const router = Router();
import { 
    getAllInsuranceTypes, 
    getInsuranceTypeById, 
    createInsuranceType, 
    updateInsuranceType, 
    deleteInsuranceType 
} from '../controllers/InsuranceTypeController.js';

router.get('/', getAllInsuranceTypes);
router.get('/:id', getInsuranceTypeById);
router.post('/', createInsuranceType);
router.put('/:id', updateInsuranceType);
router.delete('/:id', deleteInsuranceType);

export default router;
