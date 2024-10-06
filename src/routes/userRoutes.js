import express from  'express';
const router = express.Router();
import { getProblemCountDataByTag,getUserData ,getRecentSubmissionData, getActiveBadgeData, getBadgeData, getDataForSubmissionStat, getContestRankingAndHistry} from '../controllers/userController.js';

router.get('/userData/:username', getUserData); 
router.get('/solvedCntByTag/:username',getProblemCountDataByTag);
router.get('/recentSubmissions/:username',getRecentSubmissionData);
router.get('/activeBadges/:username',getActiveBadgeData);
// router.get('/contestRatingHistogram/:username',getContestRatingHistogramData);   // not working
router.get('/badgeData/:username',getBadgeData); 
router.get('/dataForSubmissionStats/:username',getDataForSubmissionStat); 
router.get('/contestRankingAndHistry/:username',getContestRankingAndHistry);


export default router;