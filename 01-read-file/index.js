const fs = require('fs');
const currentFile = fs.createReadStream(__dirname + '/text.txt', 'utf8');

currentFile.on('data', (data) =>
    console.log(data)
)