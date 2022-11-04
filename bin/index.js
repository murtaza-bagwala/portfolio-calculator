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

async function init(options, filePath) {
  console.log("Fetching portfolio value for tokens in USD....");
  options = options || {};
  if (options.date) {
    options.timestamp = dateToTimestampConvertor(options.date);
  }
  
  const strategy = getStrategyBasedOnOptions(options);
  try {
    const portfoliosByToken = await readAndParse(filePath, strategy, options);

    const usdAmountPerToken = {};

    for (const [key, portfolio] of Object.entries(portfoliosByToken)) {
      const apiOptions = {
        token: key,
        timestamp: options.timestamp ? options.timestamp : null,
      };
      const usdConversionRate = await CryptoAPI.convertCryptoToUSD(apiOptions);
      console.log(
        `USD conversion rate for token ${key}, is ${usdConversionRate} `
      );
      const usdConvertedAmount =
        portfolio.getAmountConvertedToUSD(usdConversionRate);
      console.log(
        `for token ${key} converted to USD amount is ${usdConvertedAmount}`
      );
      usdAmountPerToken[key] = usdConvertedAmount;
    }

    return usdAmountPerToken;
  } catch (error) {
    console.log("error occured", error.message);
    return null;
  }
}

module.exports = init;
