import * as moduleExports from './index';

jest.mock('./show-my-stuff', () => ({ showMyStuff: 'SMS_MODULE' }));
jest.mock('./version', () => ({ version: 'VERSION_MODULE' }));

describe('main module', () => {
  it('should export showMyStuff function as named and default export', () => {
    expect(moduleExports).toEqual({
      default: 'SMS_MODULE',
      showMyStuff: 'SMS_MODULE',
      version: 'VERSION_MODULE',
    });
  });
});
