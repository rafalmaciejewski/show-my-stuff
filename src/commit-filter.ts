import { DefaultLogFields } from 'simple-git';
import { isWithinInterval } from 'date-fns';
import { Context } from './types';

export function commitFilter(commit: DefaultLogFields, { user, timeframe }: Context): boolean {
  const commitDate = new Date(commit.date);
  const isOwnCommit = commit.author_name === user.name || commit.author_email === user.email;

  return isOwnCommit && isWithinInterval(commitDate, { start: timeframe.from, end: timeframe.to });
}
