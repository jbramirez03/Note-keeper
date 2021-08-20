const fs = require('fs');
const util = require('util');


const readFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

const deleteFromDbJson = (FileLocation, passedId) => {
  fs.readFile(fileLocation, function(err, data) {
      var ogArray = JSON.parse(data);
      const filteredArray = ogArray.filter(({ id }) => id !== passedId)
      fs.writeFile(fileLocation, JSON.stringify(filteredArray), function(err) {
          if (err) throw err;
          console.log(`Notes were updated in ${fileLocation}` );
      });
  })
}

module.exports = { readAndAppend, writeToFile, readFile, deleteFromDbJson };