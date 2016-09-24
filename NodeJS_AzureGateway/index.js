'use strict';

var deviceConnector = require('./deviceCommunication/device.connector.js');
var jsonUtils = require('./utils/json.utils.js');
var azureConnector = require('./azureConnector/azure.device.connector.js');
var connectionString = 'HostName={youriothostname};DeviceId=genuino101;SharedAccessKey={yourdevicekey}';
         
deviceConnector.connectToDevice('COM3');
azureConnector.connectToIotHub();

deviceConnector.onDataReceived(function (data) {
    try {
        var jsonArray = [];
        jsonArray = jsonUtils.parseReceivedData(data.toString(), jsonArray);
        for(i=0;i<jsonArray.length;i++)
        {
            azureConnector.sendMessageToCloud(jsonArray[i]);
        }
    }
    catch (e) {
        console.log(e);
    }
});




