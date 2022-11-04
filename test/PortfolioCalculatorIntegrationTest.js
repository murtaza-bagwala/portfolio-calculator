//const Portfolio = require("../../models/Portfolio");
const init = require("../bin/index");
const expect = require("chai").expect;
const CryptoAPI = require("../services/CryptoAPI");
const sinon = require("sinon").createSandbox();

describe("Integration test", () => {
  describe("if no options and filePath are passed then", () => {
    it("it fetches portfoliosByToken for all the tokens and fetch their converted amount to USD", async () => {
      const optionBTC = { token: "BTC", timestamp: null };
      const optionXRP = { token: "XRP", timestamp: null };
      const optionETH = { token: "ETH", timestamp: null };

      CryptoAPI.convertCryptoToUSD = sinon.stub();
      CryptoAPI.convertCryptoToUSD.withArgs(optionBTC).returns(10000);
      CryptoAPI.convertCryptoToUSD.withArgs(optionXRP).returns(1.89);
      CryptoAPI.convertCryptoToUSD.withArgs(optionETH).returns(0.367);

      const result = await init({}, "./test/fixtures/transactionsTest.csv");
      expect(Object.entries(result).length).to.equal(3);
      expect(Object.entries(result)[0][0]).to.equal("BTC");
      expect(Object.entries(result)[0][1]).to.equal("$2,986.600000");
      expect(Object.entries(result)[1][0]).to.equal("ETH");
      expect(Object.entries(result)[1][1]).to.equal("$0.099541");
      expect(Object.entries(result)[2][0]).to.equal("XRP");
      expect(Object.entries(result)[2][1]).to.equal("-$4.046278");

      sinon.restore();
    });
  });

  describe("if date options and filePath are passed then", () => {
    it("it fetches portfoliosByToken for all the tokens and fetch their converted amount to USD for that day", async () => {
      const optionBTC = { token: "BTC", timestamp: 1572047999 };
      const optionXRP = { token: "XRP", timestamp: 1572047999 };
      const optionETH = { token: "ETH", timestamp: 1572047999 };

      CryptoAPI.convertCryptoToUSD = sinon.stub();
      CryptoAPI.convertCryptoToUSD.withArgs(optionBTC).returns(80000);
      CryptoAPI.convertCryptoToUSD.withArgs(optionXRP).returns(0.89);
      CryptoAPI.convertCryptoToUSD.withArgs(optionETH).returns(0.267);

      const result = await init(
        { date: "2019-10-25" },
        "./test/fixtures/transactionsTest.csv"
      );
      expect(Object.entries(result).length).to.equal(3);
      expect(Object.entries(result)[0][0]).to.equal("BTC");
      expect(Object.entries(result)[0][1]).to.equal("$23,892.800000");
      expect(Object.entries(result)[1][0]).to.equal("ETH");
      expect(Object.entries(result)[1][1]).to.equal("$0.072418");
      expect(Object.entries(result)[2][0]).to.equal("XRP");
      expect(Object.entries(result)[2][1]).to.equal("-$1.905390");

      sinon.restore();
    });
  });

  describe("if date, token options and filePath are passed then", () => {
    it("it fetches portfoliosByToken for the given token and their converted amount to USD for that day", async () => {
      const optionBTC = { token: "BTC", timestamp: 1572047999 };
      CryptoAPI.convertCryptoToUSD = sinon.stub();
      CryptoAPI.convertCryptoToUSD.withArgs(optionBTC).returns(70000);

      const result = await init(
        { token: "BTC", date: "2019-10-25" },
        "./test/fixtures/transactionsTest.csv"
      );
      expect(Object.entries(result).length).to.equal(1);
      expect(Object.entries(result)[0][0]).to.equal("BTC");
      expect(Object.entries(result)[0][1]).to.equal("$20,906.200000");

      sinon.restore();
    });
  });

  describe("if token options and filePath are passed then", () => {
    it("it fetches portfoliosByToken for the given token and their converted amount to USD", async () => {
      const optionXRP = { token: "BTC", timestamp: null };
      CryptoAPI.convertCryptoToUSD = sinon.stub();
      CryptoAPI.convertCryptoToUSD.withArgs(optionXRP).returns(10000);

      const result = await init(
        { token: "BTC" },
        "./test/fixtures/transactionsTest.csv"
      );
      expect(Object.entries(result).length).to.equal(1);
      expect(Object.entries(result)[0][0]).to.equal("BTC");
      expect(Object.entries(result)[0][1]).to.equal("$2,986.600000");

      sinon.restore();
    });
  });

  describe("if external API gets failed then", () => {
    it("it returns null", async () => {
      const optionXRP = { token: "BTC", timestamp: null };
      CryptoAPI.convertCryptoToUSD = sinon.stub();
      CryptoAPI.convertCryptoToUSD.throws(
        new Error("External Service unavailable")
      );
      const result = await init(
        { token: "BTC" },
        "./test/fixtures/transactionsTest.csv"
      );
      expect(result).to.be.null;
      sinon.restore();
    });
  });
});
