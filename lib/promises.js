var request = require('request');
var Q = require('Q');

function requestPromise(options) {
    var deferred = Q.defer();
    request(options, function (error, response) {
        if (error) {
            deferred.reject(new Error(error));
        } else {
            deferred.resolve(response);
        }
    });
    return deferred.promise;
}

// The below code prints the number of contributors for request npm package by mikeal
// It involves sending two asynchronous HTTP requests, first to get the repo information
// and extract the contributors url from the response
// Example to send two  to get the

var headers =  {
    'User-Agent': 'request'
};

// Observe Flattening the Pyramid Of Doom / Callback Hell / Christmas Tree.
// Observe the separation between arguments and control flow functions / callbacks.
// ( Promises un-invert the inversion, cleanly separating the input arguments from control flow arguments.)
// Observe how the promises which are future results are returned from async operations.
// Observe the fulfillment handler and the error handler.

var request_repo_promise = requestPromise({
            url: "https://api.github.com/repos/mikeal/request",
//            url: "https://somesite",
            headers: headers
        });

// Observe how contribs_url could be "returned" from the promise, from a fulfillment handler
// which is like a callback in callback approach.
// Also note contribs_url is not a plain value, rather it is a promise and its value can be
// exercised using a fulfillment handler and any errors can be retrieved from the reject handler
// "then function always returns a promise."

var contribs_url = request_repo_promise.then(function(response) {
    var repo_info = JSON.parse(response.body);
    contribs_url = repo_info.contributors_url;
    return contribs_url;
});

// contribs_url is further processed below and the subsequent request to get contributors response
// is sent.
// contribs_resp holds the future response of the contributors request.

contribs_resp = contribs_url.then(function(url) {
    var response = requestPromise({
        url: contribs_url,
        headers: headers
    });
    return response;
})

// To process the data in the contribs response, use the fulfillment handler again and
// return the value we are interested in.

var contribs_count = contribs_resp.then(function(response) {
    var contribs = JSON.parse(response.body);
    return contribs.length;
});

// Register an error handler at the end to showcase
// how the error propagation happens from the preceding promises in the chain to subsequent promises.

contribs_count.then(function(count) {
    console.log(count + " Contributors");
}, function(error) {
    console.log("Handle Error At Last!");
})

