// The below code demonstrates how asynchronous functions are handled in JavaScript.
// The below code has two functions printFileContents and printAlphabet.
// printFileContents is an asynchronous function as it calls Node's fs.readFile which executes
// asynchronously.
// printAlphabet is a synchronous function as it does not involve any asynchronous operations.
// Please observe that on execution, printAlphabet gets executed before printFileContents as the JavaScript
// event loop moves on from printFileContents without blocking to execute printAlphabet and when the
// readFile operation is complete, it invokes the callback function.
// This code also introduces usage of callback functions to process the returned values from asynchronous
// functions.

var fs = require('fs');

function printFileContents() {
    fs.readFile('names.txt', 'utf8', function (error, data) {
        if (error) {
            console.log(error);
        }
        console.log(data);
    });
};

function printAlphabet() {
    console.log("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
};

printFileContents();
printAlphabet();

