module.exports={
  parseReceivedData:  function (textData, jsonArray) {
    var index = textData.indexOf('}');
    if (index == -1)
        return jsonArray;
    var firstJSON = textData.substring(0, index + 1);
    console.log(firstJSON);
    var dataJson = JSON.parse(firstJSON);
    jsonArray.push(dataJson);
    if (textData.length > index + 1) {
        jsonArray = this.parseReceivedData(textData.substring(index + 1), jsonArray);
    }
    return jsonArray;

}
}