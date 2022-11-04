const { DATE_REGEX } = require("../constants");

const isDateValid = (dateString) => {
  if (!dateString.match(DATE_REGEX)) return false;
  const date = new Date(dateString);
  const epochMilliSeconds = date.getTime();
  if (!epochMilliSeconds || epochMilliSeconds <= 0) return false;
  return true;
};

module.exports = isDateValid;
