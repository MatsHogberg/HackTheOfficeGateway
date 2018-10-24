var nconf = require('nconf');
var defaults = {
    cacheSize: 10,
    timeDelay: 50000,
    connectionString: "HostName=HTOHub.azure-devices.net;DeviceId=HtoGateway;SharedAccessKey=EmedySYRW/5HfGUCLI2cvRcjQm1l/av6LTcr0oZkdhE="
};
nconf.argv()
     .env()
     .file({ file: "../config.json" })
     .defaults(defaults);
exports.connectionString = nconf.connectionString;
exports.timeDelay = nconf.timeDelay;
exports.cacheSize = nconf.cacheSize;

exports.setTimeDelay = function(newDelay){
    nconf.set("timeDelay", newDelay);
    nconf.save(function(err){
        if(err){
            console.log("Error saving new delay: " + err);
        }
    });
};
exports.setCacheSize = function(newCacheSize){
    nconf.set("cacheSize", newCacheSize);
    nconf.save(function(err){
        if(err){
            console.log("Error saving new cache size: " + err);
        }
    });
};

