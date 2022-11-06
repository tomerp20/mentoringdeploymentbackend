const fs = require('fs');

const createFile = (name) => {
    fs.writeFileSync(name, 'Hello Mosh');
    console.log('File Created');
}

const readFile = (name) => {
    const content = fs.readFileSync(name, 'utf-8');
    return content;
}

const deleteFile = (name) => {
    fs.unlinkSync(name);
}

module.exports = {
    createFile,
    readFile,
    deleteFile
};