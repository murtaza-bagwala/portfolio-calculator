const portfolioCreator = require("../utils/PortfolioCreator");

function portfolioByToken(line) {
  const items = line.split(",");
  const token = items[2];
  if (token === this.option.token) {
    this.portfoliosByToken = portfolioCreator.updateOrCreatePortfolio(
      items,
      this.portfoliosByToken
    );
  }
}

module.exports = portfolioByToken;
