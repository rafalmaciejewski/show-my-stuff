import { RemoteWithRefs } from 'simple-git';
import { Provider, Repository } from './types';

type RefParts = [protocol: 'http' | 'https', repositoryUrl: string, org: string, project: string];

export function getRepositoryFromRemotes(
  remotes: RemoteWithRefs[],
  initialProvider: Provider = 'unknown',
): Repository {
  const origin = remotes.find((remote) => remote.name === 'origin');
  const ref = origin.refs.fetch ?? origin.refs.push;

  const [protocol, repositoryUrl, org, project] = extract(ref);

  const provider = initialProvider === 'unknown' ? detectProvider(repositoryUrl) : initialProvider;

  return {
    type: provider,
    protocol,
    host: repositoryUrl,
    org,
    project,
  };
}

function extract(ref: string): RefParts {
  const protocol = ref.startsWith('http://') ? 'http' : 'https';
  const filteredRef = filterRef(ref);
  if (ref.startsWith('git@')) {
    const [repositoryUrl, projectPath] = filteredRef.split(':');
    const [org, ...projectParts] = projectPath.split('/');
    const project = projectParts.join('/');
    return [protocol, repositoryUrl, org, project];
  } else {
    const [repositoryUrl, org, ...projectPars] = filteredRef.split('/');
    const project = projectPars.join('/');
    return [protocol, repositoryUrl, org, project] as RefParts;
  }
}

function detectProvider(repositoryUrl: string): Provider {
  if (repositoryUrl.includes('github')) {
    return 'github';
  }
  if (repositoryUrl.includes('gitlab')) {
    return 'gitlab';
  }
  if (repositoryUrl.includes('bitbucket')) {
    return 'bitbucket';
  }
  return 'unknown';
}

function filterRef(ref: string): string {
  return ref
    .replace(/https?:\/\//, '')
    .replace(/ssh?:\/\//, '')
    .replace('git@', '')
    .replace(/\.git$/, '');
}
