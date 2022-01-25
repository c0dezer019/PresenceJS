const ax = require('axios');

export const get = (payload) => {
    ax.get('/bot/graphql', payload)
        .then(res => res)
}
