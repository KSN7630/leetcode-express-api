# LeetCode Express API

Welcome to the **LeetCode Express API**, a simple and flexible mediator service to interact with LeetCode's API via GraphQL. Using this API, you can retrieve various types of data from LeetCode by providing only the username.

You can access the live version of this API at: [https://leetcode-express-api.vercel.app/](https://leetcode-express-api.vercel.app/)

## Features
- Retrieve user profile data.
- Fetch problem count data by tag.
- Get recent submission details.
- Retrieve information on active badges.
- Fetch all badge data.
- Retrieve submission stats.
- Access contest ranking and history data.

## Endpoints

Below are the available API routes. Simply replace `your_username` with the desired LeetCode username to get the corresponding data.

| Endpoint                                     | Description                                         |
|----------------------------------------------|-----------------------------------------------------|
| `/api/userData/your_username`                | Get basic user profile data.                        |
| `/api/solvedCntByTag/your_username`          | Get problem count data categorized by tag.          |
| `/api/recentSubmissions/your_username`       | Retrieve details of recent submissions.             |
| `/api/activeBadges/your_username`            | Get data of user's active badges.                   |
| `/api/badgeData/your_username`               | Fetch all badge-related data for the user.          |
| `/api/dataForSubmissionStats/your_username`  | Retrieve data for showing submission stats.         |
| `/api/contestRankingAndHistry/your_username` | Get contest ranking and history data for the user.  |

You can try out these endpoints on the live API hosted at Vercel:
```bash
https://leetcode-express-api.vercel.app/api/userData/your_username



