function asyncSquareCallback(num, callback) {
    setTimeout(function() {
        ret = num * num;
        callback(ret);
    }, Math.abs(num) );
}

asyncSquareCallback(10, function(val) {
    console.log("*******************");
    console.log(val);
    console.log("*******************");
});