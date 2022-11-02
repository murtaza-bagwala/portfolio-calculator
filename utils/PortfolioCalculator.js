const updatePortfolioAmount = (transactionType, portfolio, amount) => {
  transactionType === "DEPOSIT"
    ? portfolio.addAmount(amount)
    : portfolio.subtractAmount(amount);
  return portfolio;
};

module.exports = { updatePortfolioAmount };
