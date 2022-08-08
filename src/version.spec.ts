import mockFs from 'mock-fs';

import { version } from './version';

describe('version', () => {
  beforeEach(() => {
    mockFs({
      'package.json': '{"version":"1.2.3"}',
    });
  });

  afterEach(() => {
    mockFs.restore();
  });

  it('should return version from project package.json', () => {
    expect(version()).toBe('1.2.3');
  });
});
