const fs = require('fs');
const path = require('path');
const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, {withFileTypes: true}, (error, items) => {
    if(error) {
        console.log('Unable to get information about directory: ' + error)
        throw error;
    }

    items.forEach(file => {
        if(file.isFile()) {
            let nameFile = file.name;
            let nameFileArray = nameFile.split(".");
            nameFileArray.splice(nameFileArray.length - 1, 1).join("");

            let formatFile = path.extname(nameFile);

            let formatFileArray = formatFile.split(".")[1];

            fs.stat(__dirname + "/secret-folder/" + nameFile,  (err, stats) => {
                console.log(nameFileArray + " - " + formatFileArray + " - " + stats.size / 1000 + "kb");
            })
        }
    })
});