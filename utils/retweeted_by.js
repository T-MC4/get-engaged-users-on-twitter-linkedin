import fs from "fs";

export async function findRetweetersOfATweet(client, tweetId) {
	try {
		const getRetweetingUsers = await client.users.tweetsIdRetweetingUsers(
			// Tweet ID of the Tweet to request liking users of
			tweetId,
			{
				//A comma separated list of fields to expand.
				expansions: ["pinned_tweet_id"],

				//A comma separated list of Tweet fields to display.
				"tweet.fields": [
					"created_at",
					"author_id",
					"conversation_id",
					"public_metrics",
					"context_annotations",
					"text",
				],

				//A comma separated list of User fields to display.
				"user.fields": [
					"username",
					"description",
					"created_at",
					"verified",
					"url",
					"profile_image_url",
					"name",
					"entities",
				],

				//The maximum number of results
				max_results: 10,
			}
		);

		fs.writeFileSync(
			"./data/retweeters.json",
			JSON.stringify(getRetweetingUsers)
		);

		console.dir(getRetweetingUsers, {
			depth: null,
		});

		return getRetweetingUsers;
	} catch (error) {
		console.log(error);
	}
}

// const needle = require("needle");
// // The code below sets the bearer token from your environment variables
// // To set environment variables on macOS or Linux, run the export command below from the terminal:
// // export BEARER_TOKEN='YOUR-TOKEN'

// const token = process.env.BEARER_TOKEN;

// // You can replace the ID given with the Tweet ID you wish to lookup Retweeting users for
// // You can find an ID by using the Tweet lookup endpoint
// const id = "1354143047324299264";

// const endpointURL = `https://api.twitter.com/2/tweets/${id}/retweeted_by`;

// async function getRequest() {
//   // These are the parameters for the API request
//   // by default, only the Tweet ID and text are returned
//   const params = {
//     "tweet.fields": "lang,author_id", // Edit optional query parameters here
//     "user.fields": "created_at", // Edit optional query parameters here
//   };

//   // this is the HTTP header that adds bearer token authentication
//   const res = await needle("get", endpointURL, params, {
//     headers: {
//       "User-Agent": "v2RetweetedByUsersJS",
//       authorization: `Bearer ${token}`
//     },
//   });

//   if (res.body) {
//     return res.body;
//   } else {
//     throw new Error("Unsuccessful request");
//   }
// }

// (async () => {
//   try {
//     // Make request
//     const response = await getRequest();
//     console.dir(response, {
//       depth: null,
//     });
//   } catch (e) {
//     console.log(e);
//     process.exit(-1);
//   }
//   process.exit();
// })();
