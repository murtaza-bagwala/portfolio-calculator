const updateOrCreatePortfolio = require("../utils/PortfolioCreator");

function portfolioByDateAndToken(line) {
  const items = line.split(",");
  const { token, timestamp: timestampSinceEpoch } = this.option;
  const timestamp = items[0];
  if (items[2] === token && timestamp <= timestampSinceEpoch) {
    this.portfoliosByToken = updateOrCreatePortfolio(
      items,
      this.portfoliosByToken
    );
  }
}

module.exports = portfolioByDateAndToken;
