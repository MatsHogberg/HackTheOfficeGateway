var dataController = require("./controllers/dataController.js");
var appRouter = function(app) {

    app.get("/", function(req, res) {
        dataController.handleUpdateQuery(req,res);
});

app.get("/:deviceId/:value", function(req, res){
    // res.send({"Device": req.params.deviceId, "Value": req.params.value});
    dataController.handleUpdate(req,res);
});
app.get("/:deviceId/:value/:pushthru", function(req, res){
    dataController.handleUpdate(req,res);
});

};
module.exports = appRouter;