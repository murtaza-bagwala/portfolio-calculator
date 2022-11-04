const { TIMESTAMP } = require("../constants");
const updateOrCreatePortfolio = require("../utils/PortfolioCreator");

function allPortfolios(line) {
  const items = line.split(",");
  if (items[0] != TIMESTAMP) {
    this.portfoliosByToken = updateOrCreatePortfolio(
      items,
      this.portfoliosByToken
    );
  }
}

module.exports = allPortfolios;
