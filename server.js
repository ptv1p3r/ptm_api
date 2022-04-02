const app = require('./config/express')();
const port = app.get('port');

// REST SERVER START
app.listen(port, () => {
    console.log(`Project Tree Management REST API on Port ${port}`)
});
