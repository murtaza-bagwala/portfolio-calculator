const https = require("https");

function doRequest(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      let responseBody = "";

      res.on("data", (chunk) => {
        responseBody += chunk;
      });

      res.on("end", () => {
        console.log(JSON.parse(responseBody));
        resolve(JSON.parse(responseBody));
      });
    });

    req.on("error", (err) => {
      reject(err);
    });
  });
}

const convertCryptoToUSD = async (options) => {
  const API_KEY = process.env.CRYPTOCOMPARE_API_KEY;
  let url = `https://min-api.cryptocompare.com/data/price?fsym=${options.token}&tsyms=USD&api_key=${API_KEY}`;
  if (options.timestamp) {
    url = `https://min-api.cryptocompare.com/data/pricehistorical?fsym=${options.token}&tsyms=USD&ts=${options.timestamp}&api_key=${API_KEY}`;
  }
  await doRequest(url);
};

module.exports = convertCryptoToUSD;
