const isDateValid = (dateString) => {
  const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateString.match(DATE_REGEX)) return false;
  const date = new Date(dateString);
  const epochMilliSeconds = date.getTime();
  return epochMilliSeconds || epochMilliSeconds === 0;
};

module.exports = isDateValid;
