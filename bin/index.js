#!/usr/bin/env node

const allPortfoliosByDate = require("../strategies/AllPortfoliosByDate");
const allPortfolios = require("../strategies/AllPortfolios");
const portfolioByToken = require("../strategies/PortfolioByToken");
const portfolioByDateAndToken = require("../strategies/PortfolioByDateAndToken");
const readAndParse = require("../parsers/CSVParser");

const option = {
  date: "1972-10-03",
};

let a = {};

if (option.token && option.date) {
  a = readAndParse("./transactions.csv", portfolioByDateAndToken, option);
} else if (option.token) {
  a = readAndParse("./transactions.csv", portfolioByToken, option);
} else if (option.date) {
  a = readAndParse("./transactions.csv", allPortfoliosByDate, option);
} else {
  a = readAndParse("./transactions.csv", allPortfolios, option);
}
