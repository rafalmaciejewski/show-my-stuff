import chalk from 'chalk';
import { Formatter, Log } from '../types';

export default class TextFormatter implements Formatter {
  format = (logs: Log[]) => logs.map(this.formatLog).join('\n');

  private formatLog(log: Log): string {
    return `
${chalk.dim(log.date)}
${log.title.trim()}${log.description ? `\n${chalk.dim(log.description.trim())}` : ''}
${chalk.bold('link: ')}${log.link}`;
  }
}
