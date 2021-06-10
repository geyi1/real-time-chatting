function getTimeInAmPm() {
  const date = new Date();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let ampm = hour >= 12 ? "pm" : "am";
  hour = hour % 12;
  minute = minute < 10 ? "0" + minute : minute;
  hour = hour ? hour : 12;
  let timeNow = hour + ":" + minute + " " + ampm;
  return timeNow;
}

module.exports = {
  getTimeInAmPm,
};
