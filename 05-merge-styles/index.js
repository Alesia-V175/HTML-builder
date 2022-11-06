const fs = require('fs');
const path = require('path');

const projectFolder = __dirname + "/project-dist";
const stylesFolder = __dirname + "/styles";

fs.readdir(stylesFolder, {withFileTypes: true}, (error, items) => {
    if (error) {
        console.log('Unable to get information about directory: ' + error)
        throw error;
    }

    fs.unlink(projectFolder + "/bundle.css", (err) => {});

    items = items
        .filter(file => file.isFile())
        .filter(file => {
            let fileFormat = path.extname(file.name).split(".")[1];
            return fileFormat === "css";
        })

    readStyleFiles(items, 0);
})

function readStyleFiles(items, position) {
    if(items.length === position) {
        return;
    }
    let file = items[position];
    let currentFile = fs.createReadStream(stylesFolder + "/" + file.name, 'utf8');
    currentFile.on('data', (data) => {
        fs.readFile(projectFolder + "/bundle.css", 'utf8', function(error, fileContent){
            if(error) {
                fileContent = "";
            } else {
                fileContent += "\n";
            }
            fs.promises.writeFile(projectFolder + "/bundle.css", fileContent + data);
            readStyleFiles(items, ++position);
        })
    })
}