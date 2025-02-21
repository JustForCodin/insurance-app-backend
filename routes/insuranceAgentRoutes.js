import { Router } from 'express';
const router = Router();
import { 
    getAllInsuranceAgents, 
    getInsuranceAgentById, 
    createInsuranceAgent, 
    updateInsuranceAgent, 
    deleteInsuranceAgent 
} from '../controllers/InsuranceAgentController.js';

router.get('/', getAllInsuranceAgents);
router.get('/:id', getInsuranceAgentById);
router.post('/', createInsuranceAgent);
router.put('/:id', updateInsuranceAgent);
router.delete('/:id', deleteInsuranceAgent);

export default router;
