var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/scripts'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
var routes = require("./routes/routes.js")(app);
var server = app.listen(3000, function () {
    console.log("Listening on port %s...", server.address().port);
});
