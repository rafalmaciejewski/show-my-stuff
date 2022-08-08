import simpleGit from 'simple-git';
import { commitFilter } from './commit-filter';
import { commitToLog } from './commit-to-log';
import { getContext } from './get-context';
import { ShowMyStuffOpts } from './types';

export async function showMyStuff(opts: ShowMyStuffOpts): Promise<string> {
  const git = simpleGit(process.cwd());
  const context = await getContext(git, opts);
  const commits = await git.log();

  const logs = commits.all
    .filter((commit) => commitFilter(commit, context))
    .map((commit) => commitToLog(commit, context));
  if (opts.reverse) {
    logs.reverse();
  }
  return context.formatter.format(logs);
}
