
'use strict';
/* hub.js isn't included in the repo for obvious reasons... */
var secrets = require("./hub.js");
var connectionString = secrets.connectionstring;

var Mqtt = require("azure-iot-device-mqtt").Mqtt;
var DeviceClient = require("azure-iot-device").Client;
var Message = require("azure-iot-device").Message;
var client = DeviceClient.fromConnectionString(connectionString, Mqtt);

/**
 * Sends an array of data away to the IoT hub.
 * Once we have a hub set up, and a connection string for our device,
 * uncomment the code below. 
 * @param {*} d 
 */  
function sendToIoTHub(d){
    console.log("Connection string: " + connectionString);
    var payload = JSON.stringify(d);
    var message = new Message(payload);
    client.sendEvent(message, function(err){
        console.log("\r\n***********************\r\n");
        if(err){
            console.error("Send error: " + err.toString());
             return false;
        }else{
            console.log("**********\r\nMessage sent.\r\n**********");
        }
    });
    console.log(payload);
    console.log("Sent to hub.");
    return true;
}
exports.send = function(dataArray){
    return sendToIoTHub(dataArray);
}