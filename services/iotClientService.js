
'use strict';
/* hub.js isn't included in the repo for obvious reasons... */
var secrets = require("./hub.js");
var config = require("./configService.js");

var connectionString = config.connectionString;// secrets.connectionstring;

var Mqtt = require("azure-iot-device-mqtt").Mqtt;
var DeviceClient = require("azure-iot-device").Client;
var Message = require("azure-iot-device").Message;
var client = DeviceClient.fromConnectionString(connectionString, Mqtt);

/**
 * Sends an array of data away to the IoT hub.
 */  
function sendToIoTHub(d){
    var payload = JSON.stringify(d);
    var message = new Message(payload);
    client.sendEvent(message, function(err){
        if(err){
            console.error("Send error: " + err.toString());
        }else{
            console.log("*************\r\nMessage sent.\r\n*************");
        }
    });
    return true;
}
exports.send = function(dataArray){
    return sendToIoTHub(dataArray);
}