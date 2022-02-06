const { DateTime } = require('luxon');
const m = require('moment-timezone');

const timeConversion = (timezone, datetime) => m(datetime.toISOString()).tz(timezone).format();

const timeIdle = (timezone, datetime) => {
    const start = DateTime.fromISO(timeConversion(timezone, datetime));
    const end  = DateTime.fromISO(timeConversion(timezone, datetime));

    return end.diff
    (
        start,
        ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds'],
        { conversionAccuracy: 'longterm' },
    )
        .toObject();
};

const generateIdleString = (timezone, datetime) => {
    const timeStr = [];

    // Returns something like 0 years, 10 months, 24 days, 0 hours, 1 minutes, and 25 seconds.
    Object.entries(timeIdle(timezone, datetime)).map(([key, value]) => timeStr.push(`${value} ${key}`));
    timeStr[timeStr.length - 1] = `and ${timeStr[timeStr.length - 1]}.`; // Got to be grammatically correct, right

    return timeStr.join(', ').trim();
}

const avg = (arrOfValues) => {
    const reducer = (last, current) => last + current;
    const sum = arrOfValues.reduce(reducer);
    return sum / arrOfValues.length;
};

module.exports = { avg, generateIdleString };
