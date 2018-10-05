'use strict';
var connectionString = "{Your device connection string here}";
var Mqtt = require("azure-iot-device-mqtt").Mqtt;
var DeviceClient = require("azure-iot-device").Client;
var Message = require("azure-iot-device").Message;
// var client = DeviceClient.fromConnectionString(connectionString, Mqtt);
function sendToIoTHub(d){
    var payload = JSON.stringify(d);
    var message = new Message(payload);
    // client.sendEvent(message, function(err){
    //     if(err){
    //         console.error("Send error: " + err.toString());
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