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

const getCryptoToCurrencyConversionRate = async (options, currency = "USD") => {
  const API_KEY = process.env.CRYPTOCOMPARE_API_KEY;
  let url = `https://min-api.cryptocompare.com/data/price?fsym=${options.token}&tsyms=${currency}&api_key=${API_KEY}`;
  if (options.timestamp) {
    url = `https://min-api.cryptocompare.com/data/pricehistorical?fsym=${options.token}&tsyms=${currency}&ts=${options.timestamp}&api_key=${API_KEY}`;
  }
  const conversionRate = await doRequest(url);
  return options.timestamp
    ? conversionRate[options.token][currency]
    : conversionRate[currency];
};

module.exports = { getCryptoToCurrencyConversionRate };
