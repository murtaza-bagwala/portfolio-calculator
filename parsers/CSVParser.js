const fs = require("fs");
const readline = require("readline");

function parse(filePath, strategy, option) {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(filePath, "utf-8");
    const readlineInterface = readline.createInterface({ input: readStream });
    this.portfoliosByToken = {};
    this.option = option;
    readlineInterface.on("line", strategy.bind(this));
    readlineInterface.on("error", (error) => reject(error));
    readlineInterface.on("close", () => {
      console.log("Data parsing completed", this.portfoliosByToken);
      resolve(this.portfoliosByToken);
    });
  });
}

const readAndParse = async (filePath, strategy, option) => {
  return await parse(filePath, strategy, option);
};

module.exports = readAndParse;
