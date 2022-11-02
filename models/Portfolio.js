const currency = require("currency.js");

class Portfolio {
  constructor(token, amount = 0) {
    this.token = token;
    this.amount = currency(amount, { precision: 6 });
  }

  getToken() {
    return this.token;
  }

  getAmount() {
    return this.amount;
  }

  addAmount(amount) {
    this.amount = this.amount.add(amount);
  }

  subtractAmount(amount) {
    this.amount = this.amount.subtract(amount);
  }
}

module.exports = Portfolio;
