const { calcNewStatus } = require('../util/dataTransformer');

describe('test each status and listType = "anime"', () => {
  test('test PAUSED as argument', () => {
    const result = calcNewStatus('PAUSED');
    expect(result).toEqual('On-Hold');
  });
  test('test PLANNING as argument', () => {
    const result = calcNewStatus('PLANNING');
    expect(result).toEqual('Plan to Watch');
  });
  test('test CURRENT as argument', () => {
    const result = calcNewStatus('CURRENT');
    expect(result).toEqual('Watching');
  });
  test('test DROPPED as argument', () => {
    const result = calcNewStatus('DROPPED');
    expect(result).toEqual('Dropped');
  });
  test('test COMPLETED as argument', () => {
    const result = calcNewStatus('COMPLETED');
    expect(result).toEqual('Completed');
  });
});

describe('tests for listType = "manga"', () => {
  test('test PLANNING as argument', () => {
    const result = calcNewStatus('PLANNING', 'manga');
    expect(result).toEqual('Plan to Read');
  });
  test('test CURRENT as argument', () => {
    const result = calcNewStatus('CURRENT', 'manga');
    expect(result).toEqual('Reading');
  });
});
