function asyncSquare(num, fn) {
    setTimeout(function() {
            ret = num * num;
            return ret;
    }, 10000 );
}

function syncSquare(num) {
        return num * num;
}


var sync_square_10 = syncSquare(10);
var async_square_10 = asyncSquare(10);

console.log(sync_square_10);
console.log(async_square_10);
