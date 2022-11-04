const Portfolio = require("../../models/Portfolio");
const portfolioCalculator = require("../../utils/PortfolioCalculator");
const expect = require("chai").expect;

describe("Testing portfolioCalculator", () => {
  it("subtracts or adds an amount based on the transaction type", () => {
    const portfolio = new Portfolio("BTC", 0.248001);

    portfolioCalculator("DEPOSIT", portfolio, 0.241001);
    expect(portfolio.getAmount().value).to.equals(0.489002);

    portfolioCalculator("WITHDRAWAL", portfolio, 0.241001);
    expect(portfolio.getAmount().value).to.equals(0.248001);
  });
});
