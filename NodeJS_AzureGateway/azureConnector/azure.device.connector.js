
module.exports =
    {
        sendMessageToCloud: function (message) {
            var Message = require('azure-iot-device').Message;
            message.timestamp = Date.now();
            var data = JSON.stringify(message);
            var iotMessage = new Message(data);
            console.log("Sending message: " + iotMessage.getData());
            this.client.sendEvent(iotMessage, this.printResultFor('send'));
        },
        printResultFor: function (op) {
            return function printResult(err, res) {
                if (err) console.log(op + ' error: ' + err.toString());
                if (res) console.log(op + ' status: ' + res.constructor.name);
            };
        },
        connectCallback: function (err) {
            if (err) {
                console.log('Could not connect: ' + err);
            } else {
                console.log('Client connected');
            }
        },
        connectToIotHub: function (connectionString) {
            var clientFromConnectionString = require('azure-iot-device-amqp').clientFromConnectionString;
            this.client = clientFromConnectionString(connectionString);
            this.client.open(this.connectCallback);
        }
    }