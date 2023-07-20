import { findTweetsThatQuoteATweet } from "./utils/get_quote_tweets.js";
import { findRetweetersOfATweet } from "./utils/retweeted_by.js";
import { findLikersOfATweet } from "./utils/liking_users.js";
import { Client } from "twitter-api-sdk";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

const twitterClient = new Client(process.env.BEARER_TOKEN);

async function generateCSV() {
	// TWITTER API CALLS
	await findTweetsThatQuoteATweet(twitterClient, "1680198018899869697");
	await findRetweetersOfATweet(twitterClient, "1680198018899869697");
	await findLikersOfATweet(twitterClient, "1680198018899869697");
	// ... AND ANY OTHER FUNCTION CALLS TO THE TWILIO API

	// LINKEDIN API CALLS
	// ... AND ANY OTHER FUNCTION CALLS TO THE TWILIO API

	// CODE THAT GENERATES A CSV AS FORMATTED HERE:
	// https://docs.google.com/spreadsheets/d/108PhGpLqy6dXJtVVc1GmselpQ7TQab8YonheEJsfrJY/edit?usp=sharing
	// ....

	// Save CSV
}

await generateCSV();
