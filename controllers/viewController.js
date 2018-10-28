var conf = require("../services/configService.js");
exports.showFrontPage=function(req, res){
    res.sendFile('/index.html');
}