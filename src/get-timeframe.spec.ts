import { getTimeframe } from './get-timeframe';

describe('getTimeframe', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2015-02-02'));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should accept duration in short format', () => {
    expect(getTimeframe('1d')).toEqual({
      from: new Date('2015-02-01'),
      to: new Date('2015-02-02'),
    });

    expect(getTimeframe('1w')).toEqual({
      from: new Date('2015-01-26'),
      to: new Date('2015-02-02'),
    });
  });

  it('should accept time range separated with equals symbol', () => {
    expect(getTimeframe('2015-02-02=2016-02-02')).toEqual({
      from: new Date('2015-02-02'),
      to: new Date('2016-02-02'),
    });

    expect(getTimeframe(' 2017-02-02 = 2017-06-13 ')).toEqual({
      from: new Date('2017-02-02'),
      to: new Date('2017-06-13'),
    });
  });
});
