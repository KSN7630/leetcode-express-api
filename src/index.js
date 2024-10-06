import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import userRoute from "./routes/userRoutes.js"
import { welcomeFunction } from './controllers/userController.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// Use CORS middleware
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Use user routes
app.get('/',welcomeFunction);
app.use('/api',userRoute);


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});