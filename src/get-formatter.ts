import JsonFormatter from './formatters/json';
import TextFormatter from './formatters/text';
import { Formatter } from './types';

export function getFormatter<T extends Formatter = Formatter>(name: string): T {
  if (name === 'json') {
    return new JsonFormatter() as T;
  }
  return new TextFormatter() as unknown as T;
}
