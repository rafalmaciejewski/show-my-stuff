import merge from 'lodash.merge';
import { getSourceUrl } from './get-source-url';
import { linkPatternsByProvider } from './link-patterns';
import { Context, DeepPartial } from './types';

const commit = 'testcommit';

function getTestContext(ctx: DeepPartial<Context> = {}): Context {
  return merge(
    {
      repository: {
        protocol: 'https',
        host: 'testurl',
        type: 'unknown',
        org: 'testorg',
        project: 'testproject',
      },
      linkPattern: linkPatternsByProvider['unknown'],
    },
    ctx,
  ) as Context;
}

describe('getSourceUrl', () => {
  it('should use pattern to create link', () => {
    const ctx = getTestContext();
    expect(getSourceUrl(commit, ctx)).toBe('https://testurl/testorg/testproject/commit/testcommit');
  });
});
