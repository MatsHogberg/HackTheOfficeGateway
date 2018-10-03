var express = require("express");
var bodyParser = require("body-parser");
var c = require("./modules/cache.js");
var app = express();

var intervalLoop = null;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var c = require("./modules/cache.js");

var routes = require("./routes/routes.js")(app, c);
var server = app.listen(3000, function () {
    console.log("Listening on port %s...", server.address().port);
});
clearInterval(intervalLoop);
intervalLoop = setInterval(loop, 10000);
function loop(){
    var newLength = c.add({device: 1, v:99});
	console.log("Objects in cache: " + newLength);
}