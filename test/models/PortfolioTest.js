const currency = require("currency.js");
const Portfolio = require("../../models/Portfolio");
const expect = require("chai").expect;

describe("Testing the Portfolio Functions", function () {
  it("addAmount adds the amount to existing balance", () => {
    const portfolio = new Portfolio("BTC");
    portfolio.addAmount(0.456394);
    expect(currency(0.456394, { precision: 6 }).value).to.equal(
      portfolio.getAmount().value
    );
  });

  it("subtractAmount adds the amount to existing balance", () => {
    const portfolio = new Portfolio("BTC", 0.456394);
    portfolio.subtractAmount(0.156394);
    expect(currency(0.3, { precision: 6 }).value).to.equal(
      portfolio.getAmount().value
    );
  });

  it("getAmountConvertedToCurrency converts the amount to the currency, defaults to USD", () => {
    const portfolio = new Portfolio("BTC");
    portfolio.addAmount(0.456394);
    expect("$4,563.940000").to.equal(
      portfolio.getAmountConvertedToCurrency(10000)
    );
    expect("4563.94").to.equal(
      portfolio.getAmountConvertedToCurrency(10000, "JPY")
    );
  });
});
