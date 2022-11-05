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
            if (nameFileArray.length === 1) {
                nameFileArray = nameFile;
            } else {
                nameFileArray.splice(nameFileArray.length - 1, 1);
            }

            let formatFileArray = path.extname(nameFile).split(".")[1];

            fs.stat(__dirname + "/secret-folder/" + nameFile,  (err, stats) => {
                console.log(nameFileArray.join(".") + " - " + formatFileArray + " - " + stats.size / 1000 + "kb");
            })
        }
    })
});