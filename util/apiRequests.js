const fetch = require('node-fetch');
const url = 'https://graphql.anilist.co';
const query = `
query ($username: String, $type: MediaType) {
  MediaListCollection(userName: $username, type: $type){
    lists {
      entries {
        id
        status
        score(format: POINT_10)
        progress
        notes
        repeat
        media {
          chapters
          volumes
          idMal
          episodes
          title { romaji }
        }
      }
      name
      isCustomList
      isSplitCompletedList
      status
    }
  }
}
`;

/**
 * Fetches all Data from a user by specifying the username and wanted list
 * @param {String} username
 * @param {String} type
 */
async function getLists(username = '', type = 'ANIME') {
  const variables = {
    username,
    type,
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  };
  try {
    const {
      data: {
        MediaListCollection: { lists },
      },
    } = await (await fetch(url, options)).json();
    return lists;
  } catch (error) {
    console.error(error);
    return [];
  }
}

module.exports = {
  getLists,
};
