const portfolioCreator = require("../utils/PortfolioCreator");

function allPortfolios(line) {
  const items = line.split(",");
  if (items[0] != "timestamp") {
    this.portfoliosByToken = portfolioCreator.updateOrCreatePortfolio(
      items,
      this.portfoliosByToken
    );
  }
}

module.exports = allPortfolios;
