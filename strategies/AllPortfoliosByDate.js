const updateOrCreatePortfolio = require("../utils/PortfolioCreator");

function allPortfoliosByDate(line) {
  const items = line.split(",");
  const { timestamp: timestampSinceEpoch } = this.option;
  const timestamp = items[0];
  if (timestamp <= timestampSinceEpoch) {
    this.portfoliosByToken = updateOrCreatePortfolio(
      items,
      this.portfoliosByToken
    );
  }
}

module.exports = allPortfoliosByDate;
