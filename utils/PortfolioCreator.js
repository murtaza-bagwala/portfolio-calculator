const portfolioCalculator = require("./PortfolioCalculator");
const Portfolio = require("../models/Portfolio");

const updateOrCreatePortfolio = (line_items, portfoliosByToken) => {
  const transaction = {
    type: line_items[1],
    token: line_items[2],
    amount: line_items[3],
  };

  let portfolio = portfoliosByToken[transaction.token];
  if (portfolio) {
    portfoliosByToken[transaction.token] =
      portfolioCalculator.updatePortfolioAmount(
        transaction.type,
        portfolio,
        transaction.amount
      );
  } else {
    portfolio = new Portfolio(transaction.token);
    portfoliosByToken[transaction.token] =
      portfolioCalculator.updatePortfolioAmount(
        transaction.type,
        portfolio,
        transaction.amount
      );
  }
  return portfoliosByToken;
};

module.exports = { updateOrCreatePortfolio };
