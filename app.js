var express = require("express");
var bodyParser = require("body-parser");
var app = express();

var intervalLoop = null;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var routes = require("./routes/routes.js")(app);

var server = app.listen(3000, function () {
    console.log("Listening on port %s...", server.address().port);
});
clearInterval(intervalLoop);
intervalLoop = setInterval(loop, 10000);
function loop(){
	console.log("Sending data...");
}