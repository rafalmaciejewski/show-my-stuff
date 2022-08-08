import merge from 'lodash.merge';
import { DefaultLogFields } from 'simple-git';
import { commitFilter } from './commit-filter';
import { Context, DeepPartial } from './types';

const commits: Array<Partial<DefaultLogFields>> = [
  {
    author_email: 'foobar@email.com',
    author_name: 'foo bar',
    date: '2020-06-13',
  },
  {
    author_email: 'john@email.com',
    author_name: 'john doe',
    date: '2020-06-13',
  },
  {
    author_email: 'foobar@email.com',
    author_name: 'foo bar',
    date: '2020-08-13',
  },
  {
    author_email: 'john@email.com',
    author_name: 'john doe',
    date: '2020-08-13',
  },
  {
    author_email: 'john@email.com',
    author_name: 'john doe',
    date: '2020-10-13',
  },
];

function getTestContext(ctx: DeepPartial<Context>): Context {
  return merge(
    {
      user: {
        name: 'john doe',
        email: 'john@email.com',
      },
    },
    ctx,
  ) as Context;
}

describe('commitFilter', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should filter for own commits within timeframe', () => {
    const ctx = getTestContext({
      timeframe: {
        from: new Date('2020-06'),
        to: new Date('2020-09'),
      },
    });
    expect(commits.filter((commit) => commitFilter(commit as DefaultLogFields, ctx))).toEqual([
      {
        author_email: 'john@email.com',
        author_name: 'john doe',
        date: '2020-06-13',
      },
      {
        author_email: 'john@email.com',
        author_name: 'john doe',
        date: '2020-08-13',
      },
    ]);
  });
});
