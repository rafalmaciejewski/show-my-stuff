import { SimpleGit } from 'simple-git';
import { getFormatter } from './get-formatter';
import { getRepositoryFromRemotes } from './get-repository-from-remote';
import { linkPatternsByProvider } from './link-patterns';
import { getTimeframe } from './get-timeframe';
import { Context, ShowMyStuffOpts } from './types';

export async function getContext(
  git: SimpleGit,
  { timeframe, provider, pattern, formatter }: ShowMyStuffOpts,
): Promise<Context> {
  const [remotes, { value: userName }, { value: userEmail }] = await Promise.all([
    git.getRemotes(true),
    git.getConfig('user.name'),
    git.getConfig('user.email'),
  ]);
  if (!userName || !userEmail) {
    throw new Error('user.name or user.email git options are not configured');
  }
  const repository = getRepositoryFromRemotes(remotes, provider);
  return {
    linkPattern: pattern ?? linkPatternsByProvider[repository.type],
    formatter: getFormatter(formatter),
    repository,
    timeframe: getTimeframe(timeframe),
    user: {
      name: userName,
      email: userEmail,
    },
  };
}
