module.exports={
connectToDevice : function (portName) {
    var SerialPort = require('serialport');
    this.port = new SerialPort(portName,{
  baudRate: 9600
});
    this.port.on('open', function () {
        console.log("Port connected");
    });

},
onDataReceived : function (dataReceivedFunction) {
    this.port.on("data", function (data) { dataReceivedFunction(data); });
}
}