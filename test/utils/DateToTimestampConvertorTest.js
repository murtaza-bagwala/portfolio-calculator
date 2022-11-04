const dateToTimestampConvertor = require("../../utils/DateToTimestampConvertor");
const expect = require("chai").expect;

describe("Testing DateToTimestampConvertor", function () {
  it("returns a converted date", () => {
    expect(dateToTimestampConvertor("2022-10-11")).to.equal(1665532799);
    expect(dateToTimestampConvertor("2022-11-10")).to.equal(1668124799);
    expect(dateToTimestampConvertor("1970-01-01")).to.equal(86399);
  });
});
