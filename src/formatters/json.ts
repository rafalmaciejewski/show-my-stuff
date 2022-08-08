import { Formatter, Log } from '../types';

export default class JsonFormatter implements Formatter {
  format(logs: Log[]) {
    return JSON.stringify(logs);
  }
}
