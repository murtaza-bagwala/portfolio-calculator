const fs = require("fs");
const readline = require("readline");

function parse(filePath, strategy, option) {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(filePath, "utf-8");
    readStream.on("error", (error) => reject(error));
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
  try {
    return await parse(filePath, strategy, option);
  } catch (error) {
    console.log("Error while parsing CSV", error);
    return null;
  }
};

module.exports = readAndParse;
