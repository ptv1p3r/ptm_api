const app = require('./config/express')();
const port = app.get('port');
const fs = require('fs');

const uploadFolder = app.get('images.uploadFolder');
const publicFilesFolder = app.get('images.rootFolder');

// check for existing image folders
if (!fs.existsSync(uploadFolder)){
    fs.mkdirSync(uploadFolder, { recursive: true });
    console.log("-> Folder [" + uploadFolder + "] created...")
}

if (!fs.existsSync(publicFilesFolder)){
    fs.mkdirSync(publicFilesFolder, { recursive: true });
    console.log("-> Folder [" + publicFilesFolder + "] created...")
}

// REST SERVER START
app.listen(port, () => {
    console.log(`${app.get('server.name')} v${app.get('server.version')} on Port ${port}`)
});
