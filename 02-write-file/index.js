const fs = require('fs');

const readLine = require('readline');
const {stdin: input, stdout: output} = require('process');
const currentQuestion = readLine.createInterface({input, output});

function question() {
    currentQuestion.question('What is your favorite quote? \n', (answer) => {
        if(answer === "exit") {
            console.log('Thank you! See you again!');
            currentQuestion.close();
            return;
        }
        console.log(`Thank you for your quote: ${answer}`);
        fs.readFile("newTextFile.txt", 'utf8', function(error, fileContent){
            fs.promises.writeFile("newTextFile.txt", fileContent + answer + "\n")
        })
        question();
    })
}
question();


currentQuestion.on('SIGINT', () => {
    console.log('Thank you! See you again!');
    currentQuestion.close();
});