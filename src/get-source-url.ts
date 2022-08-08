import { tokens } from './link-patterns';
import { Context } from './types';

export function getSourceUrl(commit: string, { repository, linkPattern }: Context): string {
  const { host, org, project, protocol } = repository;

  return linkPattern
    .replace(tokens.protocol, protocol)
    .replace(tokens.host, host)
    .replace(tokens.org, org)
    .replace(tokens.project, project)
    .replace(tokens.sha, commit);
}
