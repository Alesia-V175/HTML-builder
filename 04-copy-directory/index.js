const fs = require('fs');
const path = require('path');
const folderName = __dirname + '/files-copy';

fs.mkdir(folderName, { recursive: true }, (error) => {
    if (error) {
        console.log('Unable to create new directory: ' + error);
        throw error;
    }

    fs.readdir(folderName, (error, items) => {
        if (error) {
            console.log('Unable to read directory: ' + error);
            throw error;
        }

        for (let item of items) {
            fs.unlink(path.join(folderName, item), (error) => {
                if (error) {
                    console.log('Unable to delete file: ' + error);
                    throw error;
                }
            })
        }

        fs.readdir(__dirname + '/files', {withFileTypes: true}, (error, items) => {
            if (error) {
                console.log('Unable to get information about directory: ' + error)
                throw error;
            }
            items.forEach(item => {
                fs.copyFile(__dirname + '/files/' + item.name, folderName + '/' + item.name, (error) => {
                    if (error) {
                        console.log('Unable to copy file: ' + error);
                        throw error;
                    }
                })
            })
            console.log('All files were copied');
        })
    })
});