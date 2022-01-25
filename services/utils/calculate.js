const { intervalToDuration } = require('date-fns');

const timeIdle = datetime => {
    const currentTime = new Date();
    const timeDelta = Math.abs(currentTime - datetime); // Returns an a time delta in milliseconds.
    const duration = intervalToDuration({ start: 0, end: timeDelta });
    const timeStr = []

    // Returns something like 0 years, 10 months, 24 days, 0 hours, 1 minutes, and 25 seconds
    Object.entries(duration).map(([key, value]) => timeStr.push(`${value} ${key}`));
    timeStr[timeStr.length - 1] = `and ${timeStr[timeStr.length - 1]}.` // Got to be grammatically correct, right

    return timeStr.join(', ').trim();
};

const avg = arrOfValues => {
    const reducer = (last, current) => last + current;
    const sum = arrOfValues.reduce(reducer);
    return sum / arrOfValues.length;
};

module.exports = { timeIdle, avg }
