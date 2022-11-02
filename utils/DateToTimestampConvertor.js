const convertDateToTimestamp = (dateString) => {
  const date = new Date(dateString);
  const timestampInMs = date.getTime();
  const epochTimeStamp = Math.floor(timestampInMs / 1000) + 86399;
  return epochTimeStamp;
};

module.exports = convertDateToTimestamp;
