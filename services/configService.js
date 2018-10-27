var nconf = require('nconf');
var defaults = {
    cacheSize: 100,
    timeDelay: 5000,
    connectionString: "HostName=ConnectedOffice-IoT.azure-devices.net;DeviceId=OfficeGateway1;SharedAccessKey=vHWCTfQZr/bh4JAhPJe/c7G3h1kfFa4Izcdw6xGoxHY="
};
nconf.argv()
     .env()
     .file("./config.json")
     .defaults(defaults);
exports.connectionString = nconf.get("connectionString");
exports.timeDelay = nconf.get("timeDelay");
exports.cacheSize = nconf.get("cacheSize");

console.log("Config parameters:");
console.log("\tConnection string:\t" + nconf.get("connectionString"));
console.log("\tCache size:       \t" +  nconf.get("cacheSize"));
console.log("\tPost interval:    \t" + nconf.get("timeDelay"));

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

