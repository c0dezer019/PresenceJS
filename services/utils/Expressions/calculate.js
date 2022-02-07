const { DateTime } = require('luxon');
const m = require('moment-timezone');

const timeConversion = (timezone, datetime) => m(datetime.toISOString()).tz(timezone).format();

const difference = (timezone, datetime) => {
    const start = DateTime.fromISO(timeConversion(timezone, datetime));
    const end  = DateTime.fromISO(timeConversion(timezone, datetime));

    return end.diff
    (
        start,
        ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds'],
        { conversionAccuracy: 'longterm' },
    );
};

module.exports = { difference };
