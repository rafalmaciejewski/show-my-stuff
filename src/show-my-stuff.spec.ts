import { DefaultLogFields, LogResult, RemoteWithRefs } from 'simple-git';
import { showMyStuff } from './show-my-stuff';
import { ShowMyStuffOpts } from './types';

jest.mock('simple-git', () => () => ({
  log() {
    return Promise.resolve<Partial<LogResult>>({
      all: [
        {
          author_name: 'user.name',
          author_email: 'user.email',
          date: '2015-01-25',
          message: 'TEST_COMMIT_TITLE',
          body: 'TEST_COMMIT_DESCRIPTION',
          hash: 'TEST_COMMIT_HASH',
        },
        {
          author_name: 'user.name',
          author_email: 'user.email',
          date: '2015-01-24',
          message: 'OLDER_TEST_COMMIT_TITLE',
          body: 'OLDER_TEST_COMMIT_DESCRIPTION',
          hash: 'OLDER_TEST_COMMIT_HASH',
        },
      ] as DefaultLogFields[],
    });
  },
  getRemotes() {
    return Promise.resolve<RemoteWithRefs[]>([
      {
        name: 'origin',
        refs: {
          fetch: 'git@testrepo:testorg/testproject.git',
          push: 'git@testrepo:testorg/testproject.git',
        },
      },
    ]);
  },
  getConfig(opt: string) {
    return Promise.resolve({ value: opt });
  },
}));

describe('showMyStuff', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2015-02-02'));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should return log from your commits with links', async () => {
    const result = await showMyStuff({
      timeframe: '15d',
      provider: 'github',
      formatter: 'text',
    } as ShowMyStuffOpts);
    expect(result).toContain('TEST_COMMIT_TITLE');
    expect(result).toContain('TEST_COMMIT_DESCRIPTION');
    expect(result).toContain('https://testrepo/testorg/testproject/commit/TEST_COMMIT_HASH');
  });

  it('should support json format', async () => {
    const result = await showMyStuff({
      timeframe: '15d',
      provider: 'github',
      formatter: 'json',
    } as ShowMyStuffOpts);
    expect(JSON.parse(result)).toEqual([
      {
        title: 'TEST_COMMIT_TITLE',
        description: 'TEST_COMMIT_DESCRIPTION',
        date: '2015-01-25',
        link: 'https://testrepo/testorg/testproject/commit/TEST_COMMIT_HASH',
      },
      {
        title: 'OLDER_TEST_COMMIT_TITLE',
        description: 'OLDER_TEST_COMMIT_DESCRIPTION',
        date: '2015-01-24',
        link: 'https://testrepo/testorg/testproject/commit/OLDER_TEST_COMMIT_HASH',
      },
    ]);
  });

  it('should support reversing logs', async () => {
    const result = await showMyStuff({
      timeframe: '15d',
      provider: 'github',
      formatter: 'json',
      reverse: true,
    } as ShowMyStuffOpts);
    expect(JSON.parse(result)).toEqual([
      {
        title: 'OLDER_TEST_COMMIT_TITLE',
        description: 'OLDER_TEST_COMMIT_DESCRIPTION',
        date: '2015-01-24',
        link: 'https://testrepo/testorg/testproject/commit/OLDER_TEST_COMMIT_HASH',
      },
      {
        title: 'TEST_COMMIT_TITLE',
        description: 'TEST_COMMIT_DESCRIPTION',
        date: '2015-01-25',
        link: 'https://testrepo/testorg/testproject/commit/TEST_COMMIT_HASH',
      },
    ]);
  });
});
