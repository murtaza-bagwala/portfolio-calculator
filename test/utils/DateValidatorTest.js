const dateValidator = require("../../utils/DateValidator");
const expect = require("chai").expect;

describe("Testing dateValidator", () => {
  it("returns a dateString is valid", () => {
    expect(dateValidator("2022-13-11")).to.be.false;
    expect(dateValidator("2022-12-32")).to.be.false;
    expect(dateValidator("2022-11-10")).to.be.true;
    expect(dateValidator("1969-01-01")).to.be.false;
  });
});
