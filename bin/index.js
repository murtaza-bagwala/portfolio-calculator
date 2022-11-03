#!/usr/bin/env node

const allPortfoliosByDate = require("../strategies/AllPortfoliosByDate");
const allPortfolios = require("../strategies/AllPortfolios");
const portfolioByToken = require("../strategies/PortfolioByToken");
const portfolioByDateAndToken = require("../strategies/PortfolioByDateAndToken");
const readAndParse = require("../parsers/CSVParser");
const convertCryptoToUSD = require("../services/CryptoAPI");
const dateToTimestampConvertor = require("../utils/DateToTimestampConvertor");
const yargs = require("yargs");
const isDateValid = require("../utils/DateValidator");

require("dotenv").config();

const cliOptions = yargs
  .usage("Usage: -t <token> -d <date>")
  .option("t", {
    alias: "token",
    describe: "Crypto Symbol BTC,ETH,XRP",
    type: "string",
  })
  .option("d", {
    alias: "date",
    describe: "date in format YYYY-MM-DD",
    type: "string",
  })
  .check((args) => {
    if (args.t && !["BTC", "XRP", "ETH"].includes(args.t)) {
      throw new Error("Invalid token, it should be any of BTC,ETH,XRP");
    }

    if (args.d && !isDateValid(args.d)) {
      throw new Error("Invalid date, it should be in a format of YYYY-MM-DD ");
    }

    return true;
  }).argv;

const getStrategyBasedOnOptions = (options) => {
  if (options.token && options.timestamp) {
    return portfolioByDateAndToken;
  } else if (options.token) {
    return portfolioByToken;
  } else if (options.timestamp) {
    return allPortfoliosByDate;
  } else {
    return allPortfolios;
  }
};

async function init(options) {
  console.log("Fetching portfolio value for tokens in USD....");
  options = options || {};
  if (options.date) {
    options.timestamp = dateToTimestampConvertor(options.date);
  }
  const strategy = getStrategyBasedOnOptions(options);
  try {
    const portfoliosByToken = await readAndParse(
      "./transactions.csv",
      strategy,
      options
    );

    for (const [key, portfolio] of Object.entries(portfoliosByToken)) {
      const apiOptions = {
        token: key,
        timestamp: options.timestamp,
      };
      const usdConversionRate = await convertCryptoToUSD(apiOptions);
      console.log(
        `for token ${key} converted to USD amount is ${portfolio.getAmounConvertedToUSD(
          usdConversionRate
        )}`
      );
    }
  } catch (error) {
    console.log("error occured", error.message);
  }
}

init(cliOptions);
