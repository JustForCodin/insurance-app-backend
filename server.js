import express, { json, urlencoded } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';

import branchRoutes from './routes/branchRoutes.js';
import insuranceTypeRoutes from './routes/insuranceTypeRoutes.js';
import insuranceAgentRoutes from './routes/insuranceAgentRoutes.js';
import insuranceContractRoutes from './routes/insuranceContractRoutes.js';

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(json()); // for parsing application/json
app.use(urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Conntecting to MongoDB
connect('mongodb://localhost:27017/insurance_db', { 
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error occured while connecting to MongoDB:', err));

// Routes setup
app.use('/api/branches', branchRoutes);
app.use('/api/insurance-types', insuranceTypeRoutes);
app.use('/api/insurance-agents', insuranceAgentRoutes);
app.use('/api/insurance-contracts', insuranceContractRoutes);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
