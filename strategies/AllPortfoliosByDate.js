const dateToTimestampConvertor = require("../utils/DateToTimestampConvertor");
const portfolioCreator = require("../utils/PortfolioCreator");

function allPortfoliosByDate(line) {
  const items = line.split(",");
  const { date } = this.option;
  const timestamp = items[0];
  const timestampSinceEpoch = dateToTimestampConvertor(date);
  if (timestamp <= timestampSinceEpoch) {
    this.portfoliosByToken = portfolioCreator.updateOrCreatePortfolio(
      items,
      this.portfoliosByToken
    );
  }
}

module.exports = allPortfoliosByDate;
