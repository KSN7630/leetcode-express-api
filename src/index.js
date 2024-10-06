import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { welcomeFunction } from './controllers/userController.js';
import userRoute from "./routes/userRoutes.js"

//newly added
import  compression from "compression";
import  helmet from "helmet";
import RateLimit from "express-rate-limit";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// Set up rate limiter: maximum of twenty requests per minute

const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20,
});
// Apply rate limiter to all requests
app.use(limiter);
app.use(compression()); // Compress all routes


// Add helmet to the middleware chain.
// Set CSP headers to allow our Bootstrap and Jquery to be served
app.use(
    helmet.contentSecurityPolicy({
      directives: {
        "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
      },
    }),
  );

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