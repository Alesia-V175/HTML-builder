const fs = require('fs');
const path = require('path');

const projectFolder = __dirname + "/project-dist";
const stylesFolder = __dirname + "/styles";
const assetsFolder = __dirname + "/assets";
const assetsProjectDistFolder = projectFolder + "/assets";
const templateHtmlFile = __dirname + "/template.html";

fs.mkdir(projectFolder, { recursive: true }, (error) => {
    if (error) {
        console.log('Unable to create new directory: ' + error);
        throw error;
    }

    let currentFile = fs.createReadStream(templateHtmlFile, 'utf8');
    currentFile.on('data', (data) => {
        fs.readFile(projectFolder + "/index.html", 'utf8', function(error, fileContent){
            if(error) {
                fileContent = "";
            }

            fs.unlink(projectFolder + "/index.html", (err) => {});

            fs.promises.writeFile(projectFolder + "/index.html", fileContent + data);
        })
    })

    fs.readdir(stylesFolder, {withFileTypes: true}, (error, items) => {
        if (error) {
            console.log('Unable to get information about directory: ' + error)
            throw error;
        }

        fs.unlink(projectFolder + "/style.css", (err) => {});

        items = items
            .filter(file => file.isFile())
            .filter(file => {
                let fileFormat = path.extname(file.name).split(".")[1];
                return fileFormat === "css";
            })

        readStyleFiles(items, 0);
        console.log("Create styles file");
    })

    fs.readdir(assetsFolder, {withFileTypes: true}, (error, items) => {
        if (error) {
            console.log('Unable to get information about directory: ' + error)
            throw error;
        }

        copyAssetsFiles(items, assetsFolder + '/', assetsProjectDistFolder + '/');
    })
})

function copyAssetsFiles(items, pathFrom, pathTo) {
    items.forEach(item => {
        if (item.isFile()) {
            fs.copyFile(pathFrom + item.name, pathTo + item.name, (error) => {
                if (error) {
                    console.log('Unable to copy file: ' + error);
                    throw error;
                }
            })
        } else {
            fs.mkdir(pathTo + item.name, {recursive: true}, (error) => {
                if (error) {
                    console.log('Unable to create new directory: ' + error);
                }
                fs.readdir(pathFrom + item.name, {withFileTypes: true}, (error, array) => {
                    if (error) {
                        console.log('Unable to get information about directory: ' + error)
                    }
                    copyAssetsFiles(array, pathFrom + item.name + "/", pathTo + item.name + "/");
                })
            })
            console.log('All files were copied');
        }
    })
}

function readStyleFiles(items, position) {
    if(items.length === position) {
        return;
    }
    let file = items[position];
    let currentFile = fs.createReadStream(stylesFolder + "/" + file.name, 'utf8');
    currentFile.on('data', (data) => {
        fs.readFile(projectFolder + "/style.css", 'utf8', function(error, fileContent){
            if(error) {
                fileContent = "";
            } else {
                fileContent += "\n";
            }
            fs.promises.writeFile(projectFolder + "/style.css", fileContent + data);
            readStyleFiles(items, ++position);
        })
    })
}