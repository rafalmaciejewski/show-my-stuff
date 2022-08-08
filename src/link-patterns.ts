import { Provider } from './types';

export const tokens = {
  protocol: '{protocol}',
  host: '{host}',
  org: '{org}',
  project: '{project}',
  sha: '{sha}',
};

export const linkPatternsByProvider: Record<Provider, string> = {
  github: `${tokens.protocol}://${tokens.host}/${tokens.org}/${tokens.project}/commit/${tokens.sha}`,
  bitbucket: `${tokens.protocol}://${tokens.host}/${tokens.org}/${tokens.project}/commits/${tokens.sha}`,
  gitlab: `${tokens.protocol}://${tokens.host}/${tokens.org}/${tokens.project}/-/commits/${tokens.sha}`,
  unknown: `${tokens.protocol}://${tokens.host}/${tokens.org}/${tokens.project}/commit/${tokens.sha}`,
};
