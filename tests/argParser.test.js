const { parseArgs } = require('../util/argParser');

const validUsername = 'John';

describe('check for username as an argument', () => {
  test('pass a username', () => {
    const { username, listsToCreate } = parseArgs({ username: validUsername });
    const isReturnvalueValid = listsToCreate.length > 0 && username.length > 0;
    expect(isReturnvalueValid).toEqual(true);
  });

  test('pass nothing', () => {
    const returnValue = parseArgs({});
    expect(returnValue).toEqual(undefined);
  });

  test('pass empty string', () => {
    const returnValue = parseArgs({ username: '' });
    expect(returnValue).toEqual(undefined);
  });
});

describe('check for lists as argument', () => {
  test('pass empty string', () => {
    const { username, listsToCreate } = parseArgs({ username: validUsername, lists: '' });
    const isReturnvalueValid = username.length > 1 && listsToCreate.length === 1;
    expect(isReturnvalueValid).toEqual(true);
  });

  test('pass Anime as item in upper case', () => {
    const { username, listsToCreate } = parseArgs({ username: validUsername, lists: 'ANIME' });
    const isReturnvalueValid = username.length > 1 && listsToCreate.length === 1;
    expect(isReturnvalueValid).toEqual(true);
  });

  test('pass an invalid item in upper case', () => {
    const { username, listsToCreate } = parseArgs({ username: validUsername, lists: 'Dōjinshi' });
    const isReturnvalueValid = username.length > 1 && listsToCreate.length === 0;
    expect(isReturnvalueValid).toEqual(true);
  });

  test('pass Manga as item in upper case', () => {
    const { username, listsToCreate } = parseArgs({ username: validUsername, lists: 'MANGA' });
    const isReturnvalueValid = username.length > 1 && listsToCreate.length === 1;
    expect(isReturnvalueValid).toEqual(true);
  });

  test('pass one item in lower case', () => {
    const { username, listsToCreate } = parseArgs({ username: validUsername, lists: 'anime' });
    const isReturnvalueValid = username.length > 1 && listsToCreate.length === 1;
    expect(isReturnvalueValid).toEqual(true);
  });

  test('pass one item in mixed case', () => {
    const { username, listsToCreate } = parseArgs({ username: validUsername, lists: 'AnImE' });
    const isReturnvalueValid = username.length > 1 && listsToCreate.length === 1;
    expect(isReturnvalueValid).toEqual(true);
  });

  test('pass multiple valid items', () => {
    const { username, listsToCreate } = parseArgs({ username: validUsername, lists: 'ANIME,MANGA' });
    const isReturnvalueValid = username.length > 1 && listsToCreate.length === 2;
    expect(isReturnvalueValid).toEqual(true);
  });

  test('pass multiple invalid items', () => {
    const { username, listsToCreate } = parseArgs({ username: validUsername, lists: 'Dojinshi,MAGAZINES' });
    const isReturnvalueValid = username.length > 1 && listsToCreate.length === 0;
    expect(isReturnvalueValid).toEqual(true);
  });

  test('pass valid and invalid items', () => {
    const { username, listsToCreate } = parseArgs({ username: validUsername, lists: 'ANIME,MAGAZINES,MANGA,Dojinshi' });
    const isReturnvalueValid = username.length > 1 && listsToCreate.length === 2;
    expect(isReturnvalueValid).toEqual(true);
  });
});

describe('test for help-flag', () => {
  test('help is true', () => {
    const result = parseArgs({ username: validUsername, lists: 'ANIME', help: true });
    expect(result).toBeUndefined();
  });

  test('help is a random number', () => {
    const result = parseArgs({ username: validUsername, lists: 'ANIME', help: Math.ceil(Math.random() * 999) });
    expect(result).toBeDefined();
  });
});
