const dateToTimestampConvertor = require("../utils/DateToTimestampConvertor");
const portfolioCreator = require("../utils/PortfolioCreator");

function portfolioByDateAndToken(line) {
  const items = line.split(",");
  const { token, date } = this.option;
  const timestamp = items[0];
  const timestampSinceEpoch = dateToTimestampConvertor(date);
  if (items[2] === token && timestamp <= timestampSinceEpoch) {
    this.portfoliosByToken = portfolioCreator.updateOrCreatePortfolio(
      items,
      this.portfoliosByToken
    );
  }
}

module.exports = portfolioByDateAndToken;
