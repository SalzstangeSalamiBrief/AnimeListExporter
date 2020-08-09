const fs = require('fs');
const path = require('path');
const { getLists } = require('./apiRequests');
const { transformAnimeData, transformUserData, transformMangaData } = require('./dataTransformer');

/**
 * function which calcs the actual date and returns a string
 * return: dd_hh_yyyy-hh_mm_ss
 */
function calcDate() {
  const actualDate = (new Date()).toLocaleString('en-GB', { timeZone: 'UTC' }).split(',');
  return `${actualDate[0].split('/').reverse().join('_')}--${actualDate[1].trim().split(' ').shift().split(':')
    .join('_')}`;
}

/**
 * Function which aggregate corresponding data into one list
 */
async function generateListData({ username, listsToCreate = [] }) {
  try {
    // generate container Object
    const lists = listsToCreate.reduce((acc, cur) => {
      acc[cur] = undefined;
      return acc;
    },
    {});
    const listKeys = Object.keys(lists);
    // create an array and push promises into it.
    const promisesArray = listKeys.map((key) => getLists(username, key));
    // wait for all promises
    const listResponses = await Promise.all(promisesArray);
    // concat promisesArray with lists
    listKeys.forEach((key, index) => {
      lists[key] = listResponses[index];
    });
    return lists;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * This function creates for each specified List one xml-file.
 * In each xml-file the envelope, userdata and data for each entrie get written.
 * @param {Object} args
 * @param {String} username
 */
async function generateAndWriteListData(args, username) {
  const listData = await generateListData(args);
  Object.keys(listData).forEach((key) => {
    // create a writeable stream
    const filePath = path.join(
      __dirname,
      '../',
      '/output_files',
      `${key}--${calcDate()}.xml`,
    );
    const writeStream = fs.createWriteStream(filePath);
    // write metadata
    writeStream.write('<?xml version="1.0" encoding="UTF-8" ?>\n');
    // open envelope
    writeStream.write('<myanimelist>');
    const userArgs = {
      username,
      type: key,
      total: 0,
    };
    // create an object with relevant data for calling the transformUserData-function
    listData[key].forEach(({ entries, name }) => {
      const entriesLength = entries.length;
      if (name.toLowerCase() === 'reading' || name.toLowerCase() === 'watching') {
        userArgs.active = entriesLength;
      } else {
        userArgs[name.toLowerCase()] = entriesLength;
      }
      userArgs.total += entriesLength;
    });
    // create a string for the userdata and write it to the stream
    writeStream.write(transformUserData(userArgs));

    // loop through each listData entrie. For each Entrie create a String with transformAnimeData and write the result through the stream
    listData[key].forEach(({ entries }) => {
      const transformFunction = key.toLowerCase() === 'anime' ? transformAnimeData : transformMangaData;
      for (let i = 0; i < entries.length; i += 1) {
        writeStream.write(transformFunction(entries[i]));
      }
    });
    // close envelope
    writeStream.write('\n</myanimelist>');
    // close stream
    writeStream.end();
  });
  console.log('Finished parsing');
}

module.exports = {
  generateAndWriteListData,
};
