var dataController = require("../controllers/dataController.js");
var viewController = require("../controllers/viewController.js");
/**
 * The routes.
 * 
 */
var appRouter = function(app) {
    /**
     * Route for get requests with query string data,
     * like  http://url:port?sensorid=1&value=2[&pushthru=true]
     */
    app.get("/data", function(req, res) {
        dataController.handleUpdateQuery(req,res);
    });

    /**
     * 
     */
    app.get("/flush", function(req, res){
        dataController.flushCache();
    });
    /**
     * Route for setting cache size
     */
    app.get("/cachesize/:size", function(req, res){
        dataController.handleCacheSize(req, res);
    });

    /**
     * Route for timer setting
     */
    app.get("/interval/:delay", function(req, res){
        dataController.handleIntervalChanges(req, res);
    });
    /**
     * Route for get requests with 2 parameters,
     * like http://url:port/sensorid/value
     */
    app.get("/data/:sensorid/:value", function(req, res){
        dataController.handleUpdate(req,res);
    });

    /**
     * Route for get requests with 3 parameters,
     * like http://url:port/data/sensorid/value/true
     */
    app.get("/data/:sensorid/:value/:pushthru", function(req, res){
        dataController.handleUpdate(req,res);
    });
    /**
     * Route for posted (x-www-form-urlencoded) data
     */
    app.post("/", function(req, res){
        dataController.handleUpdatePost(req,res);
    });
    app.get("/", function(req, res){
        viewController.showFrontPage(req,res);
    });

    app.get("/settings", function(req, res){
        dataController.handleSettingsRequest(req,res);
    });
};
module.exports = appRouter;