'use strict';
exports.addData =  function(d,v){
    if(c.length < maxNumberOfItemsInList){
        var data={Id:d,Value:v,TimeStamp: new Date().toString()};
        c.push(data);
        return c.length;
    }
    else{
        return false;
    }
}
exports.l = function(){
    return c.length;
}
exports.allData = function(){
    return c;
}
exports.clear = function(){
    c.length = 0;
}

var maxNumberOfItemsInList = 500;
var c = [];
