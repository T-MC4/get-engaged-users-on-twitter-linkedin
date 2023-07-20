import fs from "fs";

export async function findTweetsThatQuoteATweet(client, tweetId) {
	try {
		const quoteTweets = await client.tweets.findTweetsThatQuoteATweet(
			//The ID of the Tweet
			tweetId,
			{
				//A comma separated list of fields to expand.
				expansions: ["author_id"],

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
		fs.writeFileSync("./data/quote-tweets.json", JSON.stringify(quoteTweets));

		console.dir(quoteTweets, {
			depth: null,
		});

		return quoteTweets;
	} catch (error) {
		console.log(error);
	}
}

// Get Quote Tweets by Tweet ID
// https://developer.twitter.com/en/docs/twitter-api/tweets/quote-tweets-lookup/quick-start

// import needle from "needle";
// import { config } from "dotenv";
// config();

// const tweetId = 1680198018899869697;
// const url = `https://api.twitter.com/2/tweets/${tweetId}/quote_tweets`;

// // The code below sets the bearer token from your environment variables
// // To set environment variables on macOS or Linux, run the export command below from the terminal:
// // export BEARER_TOKEN='YOUR-TOKEN'
// const bearerToken = process.env.BEARER_TOKEN;

// // this is the ID for @TwitterDev
// const getQuoteTweets = async () => {
// 	let quoteTweets = [];
// 	let params = {
// 		//A comma separated list of fields to expand.
// 		expansions: ["author_id"],

// 		//A comma separated list of Tweet fields to display.
// 		"tweet.fields": [
// 			"created_at",
// 			"author_id",
// 			"conversation_id",
// 			"public_metrics",
// 			"context_annotations",
// 			"text",
// 		],

// 		//A comma separated list of User fields to display.
// 		"user.fields": [
// 			"username",
// 			"description",
// 			"created_at",
// 			"verified",
// 			"url",
// 			"profile_image_url",
// 			"name",
// 			"entities",
// 		],

// 		//The maximum number of results
// 		max_results: 100,
// 	};

// 	const options = {
// 		headers: {
// 			"User-Agent": "v2QuoteTweetsJS",
// 			authorization: `Bearer ${bearerToken}`,
// 		},
// 	};

// 	let hasNextPage = true;
// 	let nextToken = null;
// 	console.log("Retrieving quote Tweets...");
// 	while (hasNextPage) {
// 		let resp = await getPage(params, options, nextToken);
// 		if (
// 			resp &&
// 			resp.meta &&
// 			resp.meta.result_count &&
// 			resp.meta.result_count > 0
// 		) {
// 			if (resp.data) {
// 				console.log(resp.data);
// 				quoteTweets.push.apply(quoteTweets, resp.data);
// 			}
// 			if (resp.meta.next_token) {
// 				nextToken = resp.meta.next_token;
// 			} else {
// 				hasNextPage = false;
// 			}
// 		} else {
// 			hasNextPage = false;
// 		}
// 	}

// 	fs.writeFileSync("./quote-tweets-2.json", JSON.stringify(quoteTweets));

// 	console.dir(quoteTweets, {
// 		depth: null,
// 	});

// 	console.log(
// 		`Got ${quoteTweets.length} quote Tweets for Tweet ID ${tweetId}!`
// 	);
// };

// const getPage = async (params, options, nextToken) => {
// 	if (nextToken) {
// 		params.pagination_token = nextToken;
// 	}

// 	try {
// 		const resp = await needle("get", url, params, options);

// 		if (resp.statusCode != 200) {
// 			console.log(`${resp.statusCode} ${resp.statusMessage}:\n${resp.body}`);
// 			fs.writeFileSync("./logs.json", JSON.stringify(resp.body));
// 			return;
// 		}
// 		return resp.body;
// 	} catch (err) {
// 		throw new Error(`Request failed: ${err}`);
// 	}
// };

// await getQuoteTweets();
