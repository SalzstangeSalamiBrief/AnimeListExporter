function printHelp() {
  console.log(`
  HELP: \n
  Run this program with 'node index [params]' \n
  Params: \n
    1. -u username: Pass the username as argument to the program. \n
    2. -l lists: Pass lists to fetch and parse to the program. \n
    3. -h: List the help\n
  Example: \n
    - node index -u TestUser -l Anime,Manga
    - node index -h
  `);
}

/**
 * print an error-message based on the passed type
 * type = 0: no username specified
 * type = 1: invalid List
 * @param {Number} type
 */
function printError(type = 0) {
  let errorString = '';
  switch (type) {
    case 0:
      errorString =
        'No username specified! Please retry execution of this program with -u yourUsername';
      break;
    case 1:
      errorString = 'Invalid List specified!!';
      break;
    default:
      errorString = 'An unknown error occurred!';
      break;
  }
  console.error(errorString);
}

/**
 * Function which parses incoming arguments.
 * If help is passed as argument, then an explanation gets returned into the console
 * If no username is specified this function returns an error-message
 * In every other case an Array is parsed, which contains all lists to process
 */
function parseArgs({ username = '', lists = '', help = undefined }) {
  // if the help is !undefined, return an explanation to the user
  if (help === true) {
    return printHelp();
  }
  // check if username is specified
  if (username === '') {
    return printError(0);
  }
  /*
  Parse the input for lists
  if lists is a String with length greater than 0 parse the string
  else lists is not specified and return default ['ANIME']
  */
  const listsToCreate = [];
  if (lists.length > 0) {
    const listsToFetch = lists.split(',');
    listsToFetch.forEach((listItem) => {
      const li = listItem.toUpperCase();
      if (!listsToCreate.includes(li)) {
        switch (li) {
          case 'ANIME':
            listsToCreate.push('ANIME');
            break;
          case 'MANGA':
            listsToCreate.push('MANGA');
            break;
          default:
            printError(1);
            return;
        }
      }
    });
  } else {
    listsToCreate.push('ANIME');
  }
  return {
    username,
    listsToCreate,
  };
}

module.exports = {
  parseArgs,
};
