const { getList } = require('../util/apiRequests');

const validTestUsername = 'matchai';

function generateRandomString(){
  let randomString = '';
  const desiredResultLength = 20;
  const possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const numberOfPossibleCharacters = possibleCharacters.length;

  for(let i = 0; i < desiredResultLength; i += 1){
    const randomIndex = Math.floor(Math.random() * numberOfPossibleCharacters);
    const randomCharacter = possibleCharacters.charAt(randomIndex);
    randomString += randomCharacter;
  }
  return randomString;
}

describe('test username', () =>{
  test('invalid username', async() => {
    const randomUsername = generateRandomString();
    const list = await getList(randomUsername);
    expect(list).toHaveLength(0);
  });

  test('valid username', async () => {
    const data = await getList(validTestUsername);
    expect(data.length).toBeGreaterThan(0);
  });
});

describe('test list', () =>{
  test('invalid list', async () => {
    const randomList = generateRandomString();
    const data = await getList(validTestUsername, randomList);
    expect(data.length).toEqual(0);
  });

  test('list is ANIME', async () => {
    const data = await getList(validTestUsername, 'ANIME');
    expect(data.length).toBeGreaterThan(0);
  });

  test('list is "MANGA"', async () => {
    const data = await getList(validTestUsername, 'MANGA');
    expect(data.length).toBeGreaterThanOrEqual(0);
  });
})
