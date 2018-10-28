var sensors = [];
var localConf =  require('nconf');
var defaults = {
    cacheSize: 100,
    timeDelay: 5000,
    connectionString: "HostName=ConnectedOffice-IoT.azure-devices.net;DeviceId=OfficeGateway1;SharedAccessKey=vHWCTfQZr/bh4JAhPJe/c7G3h1kfFa4Izcdw6xGoxHY=",
    remoteConfigUrl : "whatever",
    sensors: [
        {id:1, type:6},
        {id:2, type:7},
        {id:3, type:8},
        {id:4, type:9},
        {id:5, type:0}
    ]
};
localConf.argv()
     .env()
     .file("./config.json")
     .defaults(defaults);
sensors = localConf.get("sensors");

exports.connectionString = localConf.get("connectionString");
exports.timeDelay = localConf.get("timeDelay");
exports.cacheSize = localConf.get("cacheSize");
exports.sensors = function(){
    return sensors;
};

var remoteConfigUrl = localConf.get("remoteConfigUrl");

loadRemoteConfig(remoteConfigUrl).then(function(value){
    console.log("fetched sensors from " + remoteConfigUrl);
    //console.log(value);
    sensors = value;
    console.log("Sensors: " + sensors);
}, function(err){
    console.log("Load sensors Promise rejected: " + err);
});

console.log("Config parameters:");
console.log("\tConnection string:\t" + localConf.get("connectionString"));
console.log("\tCache size:       \t" +  localConf.get("cacheSize"));
console.log("\tPost interval:    \t" + localConf.get("timeDelay"));
console.log("\tRemote config URL:\t" + localConf.get("remoteConfigUrl"));

console.log("\tRemote Config:    \t");

function loadRemoteConfig(url){
    // var request = require("request");
    // return new Promise((resolve, reject) => {
    //     request(url, (error, response, body) => {
    //         if (error) reject(error);
    //         if (response.statusCode != 200) {
    //             reject('Invalid status code <' + response.statusCode + '>');
    //         }
    //         resolve(body);
    //     });
    // });
    // return new Promise((resolve, reject) => {
    //     resolve([
    //         {id:1, type:6},
    //         {id:2, type:7},
    //         {id:3, type:8},
    //         {id:4, type:9},
    //         {id:5, type:0},
    //         {id:10, type:11}
    //     ]);
    return new Promise((resolve, reject) => {
        reject(new Error("Not implemented"));
    }
    );

}

exports.setTimeDelay = function(newDelay){
    localConf.set("timeDelay", newDelay);
    localConf.save(function(err){
        if(err){
            console.log("Error saving new delay: " + err);
        }
    });
};
exports.setCacheSize = function(newCacheSize){
    localConf.set("cacheSize", newCacheSize);
    localConf.save(function(err){
        if(err){
            console.log("Error saving new cache size: " + err);
        }
    });
};

