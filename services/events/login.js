require('dotenv').config();

module.exports = {
    name: 'login',
    execute(client) {
        client.login(process.env.TOKEN).then(() => console.log('Connected.'));
    }
}
