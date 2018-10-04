var dataController = require("./controllers/dataController.js");
var appRouter = function(app) {

    app.get("/", function(req, res) {
    res.send(c.d);
});

app.get("/:deviceId/:value", function(req, res){
    res.send({"Device": req.params.deviceId, "Value": req.params.value});
    dataController.handleUpdate(req,res);
});
app.get("/:deviceId/:value/:pushthru", function(req, res){

});
app.get("/account", function(req, res) {
    var accountMock = {
        "username": "nraboy",
        "password": "1234",
        "twitter": "@nraboy"
    }
    if(!req.query.username) {
        return res.send({"status": "error", "message": "missing username"});
    } else if(req.query.username != accountMock.username) {
        return res.send({"status": "error", "message": "wrong username"});
    } else {
        return res.send(accountMock);
    }
});

};
module.exports = appRouter;