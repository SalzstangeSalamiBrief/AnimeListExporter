/**
 * Function which parses incoming arguments.
 * If help is passed as argument, then an explanation gets returned into the console
 * If no username is specified this function returns an error-message
 * In every other case an Array is parsed, which contains all lists to process
 */
function parseArgs({ username = '', lists = '', help = undefined }) {
  // if the help is !undefined, return an explanation to the user
  if (help === true) {
    return console.log(`
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
  // check if username is specified
  if (username === '') {
    return console.error('No username specified! Please retry execution of this program with -u yourUsername');
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
            return console.error(`Invalid List specified!! ${li}`);
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
