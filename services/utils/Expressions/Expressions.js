const { shave, timeBit } = require('./stringTools');
const { difference } = require('./calculate');

class Expressions {
    constructor(datetime) {
        this.DateTime = datetime;
    }

    timePhrase() {
        // Generate a string such as 2 years, 1 month, and 2 seconds.
    }

    /* For generating tentative time estimates, where it could take up a min to max amount time to happen.
     * e.g. It can take anywhere from 1 to 2 business days to receive your funds, or it can take 15 to 30 minutes to
     * make your pizza order. */
    rangeOfTime() {
        // Generate a phrase like "from 1 to 2 hours".
    }

    /* For generating an estimate to imply that an event will occur between, but never early nor late. e.g. You should
     * bake your food for 27 to 30 minutes. */
    between() {
        // Generate a phrase like "between 2 and 3 business days."
    }

    /* For generating an estimate of time that lasts x amount of time but can take longer. e.g. You have to
     * quarantine for 5 days at minimum or up until you stop experiencing symptoms for COVID. */
    minimumOfTime() {
        // Generate a phrase like "for 5 days or more[longer]."
    }
}

module.exports = Expressions;
