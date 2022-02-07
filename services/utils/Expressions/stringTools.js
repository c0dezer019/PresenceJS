const { timeIdle } = require('./calculate.js');

const shave = word => {
    if (word[word.length - 1] === 's') {
        word = word.split('');
        word.pop();

        return word.join('');
    }
};

const timeBit = (timezone, datetime) => {
    const timeStr = [];

    // Returns something like 0 years, 10 months, 24 days, 0 hours, 1 minutes, and 25 seconds.
    Object.entries(timeIdle(timezone, datetime).toObject()).map(([key, value]) => {
        value > 0 ? timeStr.push(`${value} ${value.length === 1 ? shave(key) : key}`) : null;
    });

    timeStr[timeStr.length - 1] = `and ${timeStr[timeStr.length - 1]}.`; // Got to be grammatically correct, right

    return timeStr.join(', ').trim();
}

module.exports = { timeBit, shave };
