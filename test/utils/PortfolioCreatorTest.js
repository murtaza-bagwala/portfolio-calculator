const Portfolio = require("../../models/Portfolio");
const updateOrCreatePortfolio = require("../../utils/PortfolioCreator");
const expect = require("chai").expect;

describe("Testing updateOrCreatePortfolio", () => {
  describe("if token doesn't exist in a portfoliosByToken object", () => {
    it("it creates new portfolio and add it to the portfoliosByToken object", () => {
      let portfoliosByToken = {};
      const line_items = ["1571966849", "DEPOSIT", "XRP", "0.650535"];
      portfoliosByToken = updateOrCreatePortfolio(
        line_items,
        portfoliosByToken
      );

      expect(portfoliosByToken["XRP"]).to.be.not.null;
      expect(portfoliosByToken["XRP"].getAmount().value).to.equals(0.650535);
    });
  });

  describe("if token exists in a portfoliosByToken object", () => {
    it("it updates exisiting portfolio", () => {
      const portfolio = new Portfolio("BTC", 0.248001);
      let portfoliosByToken = {
        BTC: portfolio,
      };
      const line_items = ["1571966849", "WITHDRAWAL", "BTC", "0.110001"];
      portfoliosByToken = updateOrCreatePortfolio(
        line_items,
        portfoliosByToken
      );

      expect(portfoliosByToken["BTC"]).to.be.not.null;
      expect(portfoliosByToken["BTC"].getAmount().value).to.equals(0.138);
    });
  });
});
