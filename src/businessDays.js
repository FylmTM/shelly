const { isBefore, isWeekend, eachDay, parse } = require('date-fns');

module.exports = (startDateString, endDateString) => {
  const startDate = parse(startDateString);
  const endDate = parse(endDateString);

  if (isBefore(startDate, endDate)) {
    return eachDay(startDate, endDate).filter(date => !isWeekend(date)).length;
  } else {
    return -eachDay(endDate, startDate).filter(date => !isWeekend(date)).length;
  }
};
