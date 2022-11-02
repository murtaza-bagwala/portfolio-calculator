const portfolioCreator = require("../utils/PortfolioCreator");

function allPortfolios(line) {
  const items = line.split(",");
  this.portfoliosByToken = portfolioCreator.updateOrCreatePortfolio(
    items,
    this.portfoliosByToken
  );
}

module.exports = allPortfolios;
