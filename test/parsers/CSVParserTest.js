const readAndParse = require("../../parsers/CSVParser");

const allPortfoliosByDate = require("../../strategies/AllPortfoliosByDate");
const allPortfolios = require("../../strategies/AllPortfolios");
const portfolioByToken = require("../../strategies/PortfolioByToken");
const portfolioByDateAndToken = require("../../strategies/PortfolioByDateAndToken");
const expect = require("chai").expect;

describe("Testing the CSV Parser", () => {
  describe("with allPortfoliosStrategy and correct filePath", () => {
    it("returns all the latest portfoliosByToken", async () => {
      const result = await readAndParse(
        "./test/fixtures/transactionsTest.csv",
        allPortfolios,
        {}
      );
      expect(Object.entries(result).length).to.equal(3);
      expect(Object.entries(result)[0][0]).to.equal("BTC");
      expect(Object.entries(result)[0][1].getAmount().value).to.equal(0.29866);
    });
  });

  describe("with allPortfoliosByDateStrategy and correct filePath", () => {
    it("returns all the portfoliosByToken for the given date", async () => {
      const result = await readAndParse(
        "./test/fixtures/transactionsTest.csv",
        allPortfoliosByDate,
        {
          timestamp: 1571967110,
        }
      );

      expect(Object.entries(result).length).to.equal(2);
      expect(Object.entries(result)[0][0]).to.equal("ETH");
      expect(Object.entries(result)[0][1].getAmount().value).to.equal(0.081429);
      expect(Object.entries(result)[1][0]).to.equal("XRP");
      expect(Object.entries(result)[1][1].getAmount().value).to.equal(-2.83416);
    });
  });

  describe("with portfolioByDateAndTokenStrategy and correct filePath", () => {
    it("returns the latest portfoliosByToken for the given token and date", async () => {
      const result = await readAndParse(
        "./test/fixtures/transactionsTest.csv",
        portfolioByDateAndToken,
        {
          timestamp: 1571967200,
          token: "ETH",
        }
      );
      expect(Object.entries(result).length).to.equal(1);
      expect(Object.entries(result)[0][0]).to.equal("ETH");
      expect(Object.entries(result)[0][1].getAmount().value).to.equal(0.27123);
    });
  });

  describe(" with portfolioByTokenStrategy and correct filePath", () => {
    it("returns the latest portfoliosByToken for the given token ", async () => {
      const result = await readAndParse(
        "./test/fixtures/transactionsTest.csv",
        portfolioByToken,
        {
          token: "XRP",
        }
      );
      expect(Object.entries(result).length).to.equal(1);
      expect(Object.entries(result)[0][0]).to.equal("XRP");
      expect(Object.entries(result)[0][1].getAmount().value).to.equal(
        -2.140888
      );
    });
  });

  describe("with wrong filePath", () => {
    it("it returns null", async () => {
      const result = await readAndParse(
        "./test/fixtures/transactionsTes.csv",
        allPortfolios,
        {}
      );
      expect(result).to.be.null;
    });
  });
});
