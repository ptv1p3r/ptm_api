const app = require('./config/express')();
const port = app.get('port');

// REST SERVER START
app.listen(port, () => {
    console.log(`${app.get('server.name')} v${app.get('server.version')} on Port ${port}`)
});
