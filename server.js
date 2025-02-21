import express, { json, urlencoded } from 'express';
import session from 'express-session';
import passport from 'passport'
import passportConfig from './config/passport.js'
import { connect } from 'mongoose';
import cors from 'cors';
import { config } from 'dotenv';

import authRoutes from './routes/auth.js'
import branchRoutes from './routes/branchRoutes.js';
import insuranceTypeRoutes from './routes/insuranceTypeRoutes.js';
import insuranceAgentRoutes from './routes/insuranceAgentRoutes.js';
import insuranceContractRoutes from './routes/insuranceContractRoutes.js';

config(); // configure dotenv
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(json()); // for parsing application/json
app.use(urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(session({
    // secret: process.env.KEY_SECRET,
    secret: 'l9r-K.3R&Ko6N8Fh)lkD',
    resave: false,
    saveUninitialized: false
}));

// Conntecting to MongoDB
connect('mongodb://localhost:27017/insurance_db', { 
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error occured while connecting to MongoDB:', err));

passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());

// Routes setup
app.use('/auth', authRoutes); 
app.use('/api/branches', branchRoutes);
app.use('/api/insurance-types', insuranceTypeRoutes);
app.use('/api/insurance-agents', insuranceAgentRoutes);
app.use('/api/insurance-contracts', insuranceContractRoutes);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
