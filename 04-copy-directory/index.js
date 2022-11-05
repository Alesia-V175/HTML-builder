const fs = require('fs');
const path = require("path");
const folderName = __dirname + "/files-copy";

fs.mkdir(folderName, { recursive: true }, (error) => {
    if (error) {
        console.log('Unable to create new directory: ' + error);
        throw error;
    }
});
//
// fs.truncate(folderName, err => {
//     if(err) throw err;
//     console.log('Файл успешно очищен');
// });

fs.readdir(folderName, (error, items) => {
    if (error) {
        console.log('Unable to read directory: ' + error);
        throw error;
    }

    for (let item of items) {
        fs.unlink(path.join(folderName, item), (err) => {
            if (err) throw err;
        });
    }

    fs.readdir(__dirname + '/files', {withFileTypes: true}, (error, items) => {
        if (error) {
            console.log('Unable to get information about directory: ' + error)
            throw error;
        }
        items.forEach(item => {
            fs.copyFile(__dirname + "/files/"+ item.name,   folderName + "/" + item.name, (err) => {
                if (err) throw err;
            })
        })
        console.log("All files were copied");
    })
});
