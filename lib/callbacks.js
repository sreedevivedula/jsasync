// The below code illustrates the Pyramid Of Doom / Callback Hell /
// Christmas Tree where code marches right more than it moves down.

// While working with asynchronous functions in JavaScript, the results of
// the asynchronous operations cannot be "returned" since the JavaScript
// execution thread would have moved past the given line.
// So, the results are made available to functions that are sent along with
// the asynchronous operations, which are called "callback" functions.

// There are two issues with callbacks
//      1) They do not return values
//      2) They do not throw errors

// Problem #1) Since callbacks cannot return values, when the results of one
//             asynchronous operation has to be passed on to another
//             asynchronous operation which has to be further processed,
//             callbacks get nested leading to what is called as
//             "Pyramid Of Doom / Callback Hell / Christmas Tree" problem.
//             Due to this, the code becomes difficult to read and scroll.

// Problem #2) Since callbacks cannot throw errors, errors are not propagated
//             to further calls in the callback chain, which means,
//             error handlers have to be provided at each step.

// The below example uses request library's asynchronous request methods.
var request = require('request');

var headers =  {
    'User-Agent': 'request'
};

// In the below code, we are trying to get the number of contributors
// for the request npm package mikeal.
// The process involves
//  * Get the Repo information from github
//      * Extract the contributors_url from the repo information
//  * Get the contributors by sending the contributors_url retrieved in
//      the previous step
//      * Count the number of contributors returned in the response


request({
            url: "https://api.github.com/repos/mikeal/request",
            headers: headers
        }, function (error, response, body) {
                if(!error && response.statusCode == 200) {
                    var info = JSON.parse(body);
                    var contribs_url = info.contributors_url;
                    request({
                                  url: contribs_url,
                                headers: headers
                            }, function (error, response, body) {
                                    if (error) {
                                        console.log("Do some Error Recovery");
                                    }
                                    else if (response.statusCode == 200) {
                                        var contribs = JSON.parse(body);
                                        console.log(contribs.length + " Contributors");
                                    };
                    });
                };
    }
);
