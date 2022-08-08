import { DefaultLogFields } from 'simple-git';
import { getSourceUrl } from './get-source-url';
import { Context, Log } from './types';

export function commitToLog(commit: DefaultLogFields, ctx: Context): Log {
  return {
    title: commit.message,
    description: commit.body,
    date: commit.date,
    link: getSourceUrl(commit.hash, ctx),
  };
}
