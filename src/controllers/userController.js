import { request } from 'graphql-request';
import dotenv from 'dotenv';
dotenv.config();

export const welcomeFunction = async (req, res) => {
  res.status(200).send({
    message: "Welcome to LeetCode Express API.",
    routes :[{"To get user data " : "/api/userData/<your_username>"},
      {"To get problem count data by tag " : "/api/solvedCntByTag/<your_username>"},
      {"To get recent submission details" : "/api/recentSubmissions/<your_username>"},
      {"To get data of active badges" : "/api/activeBadges/<your_username>"},
      {"To get data of all badges" : "/api/badgeData/<your_username>"},
      {"To get data to show submission stats" : "/api/dataForSubmissionStats/<your_username>"},
      {"To get data of contest ranking and histry" : "/api/contestRankingAndHistry/<your_username>"},

    ]
  });
};


export const getUserData = async (req, res) => {
    const LEETCODE_API_URL = process.env.LEETCODE_API_URL;
    const username = req.params.username;  // Get username from URL parameters
    const query = `#graphql
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          username
          profile {
            realName
            userAvatar
            reputation
            ranking
           
          }
          githubUrl
          twitterUrl
          linkedinUrl

          languageProblemCount {
            languageName
            problemsSolved
          }
        }
      }
    `;

    try {
      const variables = { username };
      const data = await request(LEETCODE_API_URL, query, variables);
      const userData = data.matchedUser;

      return res.status(200).json({
        username: userData.username,
        profile: userData.profile,
        githubUrl: userData.githubUrl,
        twitterUrl: userData.twitterUrl,
        linkedinUrl: userData.linkedinUrl,
        languageProblemCount: userData.languageProblemCount,
    });
    } catch (error) {
        return res.status(error.response.status).json({
            message :error.response.errors
        });
    }
};

export const getRecentSubmissionData = async (req,res)=>{
  const LEETCODE_API_URL= process.env.LEETCODE_API_URL;
  const username= req.params.username;
  const query=`#graphql
    query getRecentSubmission($username:String!){
      recentAcSubmissionList(username:$username){
        id
        title
      }
    }
  `
  try{
    const variables= {username};
    const submissionData=await request(LEETCODE_API_URL,query,variables);
    return res.status(200).json({
      submissionData
    })
  }catch(error) {
    return res.status(error.response.status).json({
        message :error.response.errors
    });
}
};

export const getDataForSubmissionStat= async (req,res)=>{
  const LEETCODE_API_URL = process.env.LEETCODE_API_URL;
  const username = req.params.username;

  const query = `#graphql
    query dataForSubmissionStats($username: String!) {
      allQuestionsCount{
        difficulty
        count
      }
      matchedUser(username: $username) {
        submitStats{
          acSubmissionNum{
            difficulty
            count
            submissions
          }
          totalSubmissionNum{
            difficulty
            count
            submissions
          }
        }
      }
    }
  `;

  try {
    const variables = { username };
    const dataForSubmissionStats = await request(LEETCODE_API_URL, query, variables);
    // Returning both badges and upcomingBadges in the response
    return res.status(200).json({
      dataForSubmissionStats
    });
  }catch(error){
    return res.status(error.response.status).json({
        message :error.response.errors
    });
  }
}


//query not working
// export const getContestRatingHistogramData = async (req, res) => {
//   const LEETCODE_API_URL = process.env.LEETCODE_API_URL;
//   const username = req.params.username;

//   const query = `#graphql
//     query getContestRatingHistogram($username: String!) {
//       contestRatingHistogram(username: $username) { 
//         userCount
//         ratingStart
//         ratingEnd
//         topPercentage
//       }
//     }
//   `;

//   try {
//     const variables = { username };
//     const contestRatingHistogramData = await request(LEETCODE_API_URL, query, variables);
//    

//     // Return response with contest rating histogram data
//     return res.status(200).json({
//       contestRatingHistogramData,
//     });
//   } catch (error) {
//     return res.status(error.response.status).json({
//         message :error.response.errors
//     });
// }
// };

export const getBadgeData = async (req, res) => {
  const LEETCODE_API_URL = process.env.LEETCODE_API_URL;
  const username = req.params.username;

  const query = `#graphql
    query badgeData($username: String!) {
      matchedUser(username: $username) {
        badges {
          id
          name
          shortName
          displayName
          icon
          hoverText
          medal {
            slug
            config {
              iconGif
              iconGifBackground
            }
          }
          creationDate
          category
        }
        upcomingBadges {
          name
          icon
          progress
        }
      }
    }
  `;

  try {
    const variables = { username };
    const badgeData = await request(LEETCODE_API_URL, query, variables);
    


    // Returning both badges and upcomingBadges in the response
    return res.status(200).json({
      badges: badgeData.matchedUser.badges,
      upcomingBadges: badgeData.matchedUser.upcomingBadges
    });
  }catch(error){
    return res.status(error.response.status).json({
        message :error.response.errors
    });
  }
}

export const getActiveBadgeData=async (req,res)=>{
  const LEETCODE_API_URL=process.env.LEETCODE_API_URL;
  const username =req.params.username;

  const query = `#graphql 
    query getActiveBadge($username : String!){
      matchedUser(username:$username){
        activeBadge{
          displayName
          icon
        }
      }
    }
  `

  try {
    const variables={username};
    const badgeData= await request(LEETCODE_API_URL,query,variables);
    return res.status(200).json({
      badgeData
    })
  }catch(error){
    return res.status(error.response.status).json({
      message :error.response.errors
  });
  }
};
export const getProblemCountDataByTag = async (req, res) => {
  const LEETCODE_API_URL = process.env.LEETCODE_API_URL;
  const username = req.params.username;  // Get username from URL parameters
  const query = `#graphql
    query getProblemCountByTag($username: String!) {
      matchedUser(username: $username) {
        tagProblemCounts{
          advanced{
            tagName
            problemsSolved
          }
          intermediate{
            tagName
            problemsSolved
          }
          fundamental{
            tagName
            problemsSolved
          }

        }  
      }
    }
  `;

  try {
    const variables = { username };
    const data = await request(LEETCODE_API_URL, query, variables);
    const solvedData = data.matchedUser;
    return res.status(200).json({
      solvedData
  });
  } catch (error) {
      return res.status(error.response.status).json({
          message :error.response.errors
      });
  }
};


export const getContestRankingAndHistry = async (req,res) =>{
  const LEETCODE_API_URL = process.env.LEETCODE_API_URL;
  const username = req.params.username;  // Get username from URL parameters

  const query = `#graphql 
    query contestRatingAndHistory($username: String!) {
    userContestRanking(username: $username) {
      attendedContestsCount
      rating
      globalRanking
      totalParticipants
      topPercentage
      badge {
        name
        icon
      }
    }
    userContestRankingHistory(username: $username) {
      attended
      trendDirection
      problemsSolved
      totalProblems
      finishTimeInSeconds
      rating
      ranking
      contest {
        title
        startTime
      }
    }
  }

  `

  try{
    const variables={username};
    const contestData= await request(LEETCODE_API_URL,query,variables);


    return res.status(200).json({
      contestData
    })
  }catch(error){
    return res.status(error.response.status).json({
      message :error.response.errors
  });
}
};