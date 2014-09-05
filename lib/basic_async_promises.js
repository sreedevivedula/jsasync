var Q = require('Q');

function asyncSquarePromise(num) {
    var deferred = Q.defer();
    if (num < 0) {
        deferred.reject(new Error("Number should be Positive!"));
    } else {
        deferred.resolve(num * num);
    }
    return deferred.promise;
};

var value = asyncSquarePromise(10);

value.then(function (value) {
    console.log("*******************");
    console.log(value);
    console.log("*******************");
}, function(error) {
    console.log(error);
});

