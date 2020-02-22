const { getLists } = require('../util/apiRequests');

const validTestUsername = 'matchai';

test('test invalid username', async () => {
  const data = await getLists('abcdfghijklmnopqrs127835893');
  expect(data.length).toEqual(0);
});

test('invalid list', async () => {
  const data = await getLists(validTestUsername, 'abcdefg');
  expect(data.length).toEqual(0);
});

describe('valid username', () => {
  test('test valid username', async () => {
    const data = await getLists(validTestUsername);
    expect(data.length).toBeGreaterThan(0);
  });

  test('test valid username and type to be "ANIME"', async () => {
    const data = await getLists(validTestUsername, 'ANIME');
    expect(data.length).toBeGreaterThan(0);
  });

  test('test valid username and type to be "MANGA"', async () => {
    const data = await getLists(validTestUsername, 'MANGA');
    expect(data.length).toBeGreaterThanOrEqual(0);
  });
});
