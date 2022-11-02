const fs = require('fs');

fs.createWriteStream('newTextFile.txt',(error) => {
    if(error) {
        throw "Error! We can`t open this file";
    }
    console.log('File successfully created');
})

let readFile = fs.createReadStream('newTextFile.txt', 'utf8');
readFile.on('data', (data) =>
    console.log(data)
)


const readLine = require('readline');
const {stdin: input, stdout: output} = require('process');
const process = require('process');
const currentQuestion = readLine.createInterface({input, output});

currentQuestion.question('What is your favorite quote? \n', (answer) => {
    console.log(`Thank you for your quote: ${answer}`);

})

process.on('exit', (code) => {
    console.log('Thank you! See you again!');
    currentQuestion.close();
});

currentQuestion.on('SIGINT', () => {
    console.log('Thank you! See you again!');
    currentQuestion.close();
});