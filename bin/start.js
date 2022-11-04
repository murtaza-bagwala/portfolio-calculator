#!/usr/bin/env node

const init = require("./index")
const yargs = require("yargs");
const isDateValid = require("../utils/DateValidator");
const { SUPPORTED_TOKENS } = require("../constants");

require("dotenv").config();

const cliOptions = yargs
  .usage("Usage: -t <token> -d <date>")
  .option("t", {
    alias: "token",
    describe: "Crypto Symbol BTC,ETH,XRP",
    type: "string",
  })
  .option("d", {
    alias: "date",
    describe: "date in format YYYY-MM-DD",
    type: "string",
  })
  .check((args) => {
    if (args.t && !SUPPORTED_TOKENS.includes(args.t)) {
      throw new Error("Invalid token, it should be any of BTC,ETH,XRP");
    }

    if (args.d && !isDateValid(args.d)) {
      throw new Error("Invalid date, it should be in a format of YYYY-MM-DD ");
    }

    return true;
  }).argv;


init(cliOptions, "./transactions.csv");
