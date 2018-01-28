var csv = require('ya-csv');

exports.write = function (CSVOutputFilepath, CSVHeader, data) {
  if (!CSVOutputFilepath) {
    console.log('Missing file path of the csv output!');
  } else if (!CSVHeader) {
    console.log('Missing header!');
  } else if (!data) {
    console.log('Missing data!');
  } else {
    var writer = new csv.createCsvFileWriter(CSVOutputFilepath);
    //writing the optional header
    if (CSVHeader) {
      writer.writeRecord(CSVHeader);
    }
    
    data.forEach(datum => writer.writeRecord(datum));
  } 
}