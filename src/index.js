import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { getProblemCountDataByTag, getUserData ,getRecentSubmissionData, getActiveBadgeData, getBadgeData, getDataForSubmissionStat, getContestRankingAndHistry} from './controllers/userController.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// Use CORS middleware
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Use user routes

app.use('/api/userData/:username', getUserData); 
app.use('/api/solvedCntByTag/:username',getProblemCountDataByTag);
app.use('/api/recentSubmissions/:username',getRecentSubmissionData);
app.use('/api/activeBadges/:username',getActiveBadgeData);
// app.use('/api/contestRatingHistogram/:username',getContestRatingHistogramData);   // not working
app.use('/api/badgeData/:username',getBadgeData); 
app.use('/api/dataForSubmissionStats/:username',getDataForSubmissionStat); 
app.use('/api/contestRankingAndHistry/:username',getContestRankingAndHistry);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});