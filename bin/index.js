const allPortfoliosByDate = require("../strategies/AllPortfoliosByDate");
const allPortfolios = require("../strategies/AllPortfolios");
const portfolioByToken = require("../strategies/PortfolioByToken");
const portfolioByDateAndToken = require("../strategies/PortfolioByDateAndToken");
const readAndParse = require("../parsers/CSVParser");
const CryptoAPI = require("../services/CryptoAPI");
const dateToTimestampConvertor = require("../utils/DateToTimestampConvertor");

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

async function init(options, filePath, currency = "USD") {
  console.log("Fetching portfolio value for tokens in USD....");
  options = options || {};
  if (options.date) {
    options.timestamp = dateToTimestampConvertor(options.date);
  }

  const strategy = getStrategyBasedOnOptions(options);
  try {
    const portfoliosByToken = await readAndParse(filePath, strategy, options);

    const convertedAmountPerToken = {};

    for (const [key, portfolio] of Object.entries(portfoliosByToken)) {
      const apiOptions = {
        token: key,
        timestamp: options.timestamp ? options.timestamp : null,
      };
      const conversionRate = await CryptoAPI.getCryptoToCurrencyConversionRate(apiOptions, currency);
      console.log(
        `${currency} conversion rate for token ${key}, is ${conversionRate} `
      );
      const convertedAmount =
        portfolio.getAmountConvertedToCurrency(conversionRate, currency);
      console.log(
        `for token ${key} converted to ${currency} amount is ${convertedAmount}`
      );
      convertedAmountPerToken[key] = convertedAmount;
    }

    return convertedAmountPerToken;
  } catch (error) {
    console.log("error occured", error.message);
    return null;
  }
}

module.exports = init;
