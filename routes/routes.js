var dataController = require("../controllers/dataController.js");

var appRouter = function(app) {
    /**
     * Route for get requests with query string data
     */
    app.get("/", function(req, res) {
        dataController.handleUpdateQuery(req,res);
    });

    /**
     * Route for get requests with 2 parameters
     */
    app.get("/:sensorid/:value", function(req, res){
        // res.send({"Device": req.params.deviceId, "Value": req.params.value});
        dataController.handleUpdate(req,res);
    });

    /**
     * Route for get requests with 3 parameters
     */
    app.get("/:sensorid/:value/:pushthru", function(req, res){
        dataController.handleUpdate(req,res);
    });
    /**
     * Route for posted data
     */
    app.post("/", function(req, res){
        dataController.handleUpdatePost(req,res);
    });
};
module.exports = appRouter;