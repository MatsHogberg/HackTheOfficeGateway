var c=[];
exports.add = function(data){
    data.timestamp = Date.now.toString;
    c.push(data);
    return c.length;
};
exports.l = function(){
    return c.length;
};
exports.d = function(){
    return c;
};

