import { RemoteWithRefs } from 'simple-git';
import { getRepositoryFromRemotes } from './get-repository-from-remote';

function getTestRemotes(ref: string): RemoteWithRefs[] {
  return [
    {
      name: 'origin',
      refs: {
        fetch: ref,
        push: ref,
      },
    },
  ];
}

describe('getRepositoryFromRemote', () => {
  it('should handle http remotes', () => {
    const remotes = getTestRemotes('http://testrepository/testorg/testproject.git');
    expect(getRepositoryFromRemotes(remotes)).toStrictEqual({
      protocol: 'http',
      host: 'testrepository',
      type: 'unknown',
      org: 'testorg',
      project: 'testproject',
    });
  });

  it('should handle https remotes', () => {
    const remotes = getTestRemotes('https://testrepository/testorg/testproject.git');
    expect(getRepositoryFromRemotes(remotes)).toStrictEqual({
      protocol: 'https',
      host: 'testrepository',
      type: 'unknown',
      org: 'testorg',
      project: 'testproject',
    });
  });

  it('should handle ssh remotes', () => {
    const remotes = getTestRemotes('git@testrepository:testorg/testproject.git');
    expect(getRepositoryFromRemotes(remotes)).toStrictEqual({
      protocol: 'https',
      host: 'testrepository',
      type: 'unknown',
      org: 'testorg',
      project: 'testproject',
    });
  });

  it('should handle nested projects', () => {
    const remotes = getTestRemotes(
      'https://testrepository/testorg/testgroup/testsubgroup/testproject.git',
    );
    expect(getRepositoryFromRemotes(remotes)).toStrictEqual({
      protocol: 'https',
      host: 'testrepository',
      type: 'unknown',
      org: 'testorg',
      project: 'testgroup/testsubgroup/testproject',
    });
  });

  it('should throw an error when there is no origin remote', () => {
    const execution = () => {
      const remotes = [
        {
          name: 'not origin',
        },
        {
          name: 'still not origin',
        },
      ] as RemoteWithRefs[];
      getRepositoryFromRemotes(remotes);
    };
    expect(execution).toThrowError();
  });

  it('should detect provider by default', () => {
    const githubRepo = getRepositoryFromRemotes(
      getTestRemotes('https://github.com/testorg/testproject.git'),
    );

    expect(githubRepo.type).toBe('github');

    const githubSshRepo = getRepositoryFromRemotes(
      getTestRemotes('ssh@github.com:testorg/testproject.git'),
    );

    expect(githubSshRepo.type).toBe('github');

    const bitbucketRepo = getRepositoryFromRemotes(
      getTestRemotes('https://bitbucket.org/testorg/testproject.git'),
    );

    expect(bitbucketRepo.type).toBe('bitbucket');

    const gitlabRepo = getRepositoryFromRemotes(
      getTestRemotes('https://gitlab.com/testorg/testproject.git'),
    );

    expect(gitlabRepo.type).toBe('gitlab');

    const unknownRepo = getRepositoryFromRemotes(
      getTestRemotes('https://testrepository/testorg/testproject.git'),
    );

    expect(unknownRepo.type).toBe('unknown');
  });

  it('should use provider from arguments when not unknown', () => {
    const unknownRepo = getRepositoryFromRemotes(
      getTestRemotes('https://testrepository/testorg/testproject.git'),
      'github',
    );

    expect(unknownRepo.type).toBe('github');
  });
});
