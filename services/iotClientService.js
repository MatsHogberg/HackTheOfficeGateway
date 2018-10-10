'use strict';
var connectionString = "{Your device connection string here}";
var Mqtt = require("azure-iot-device-mqtt").Mqtt;
var DeviceClient = require("azure-iot-device").Client;
var Message = require("azure-iot-device").Message;
// var client = DeviceClient.fromConnectionString(connectionString, Mqtt);

/**
 * Sends an array of data away to the IoT hub.
 * Once we have a hub set up, and a connection string for our device,
 * uncomment the code below. 
 * @param {*} d 
 */
function sendToIoTHub(d){
    var payload = JSON.stringify(d);
    var message = new Message(payload);
    // client.sendEvent(message, function(err){
    //     if(err){
    //         console.error("Send error: " + err.toString());
    //          return false;
    //     }else{
    //         console.log("Message sent.");
    //     }
    // });
    console.log(payload);
    console.log("Sent to hub.");
    return true;
}
exports.send = function(dataArray){
    return sendToIoTHub(dataArray);
}