import ms from 'ms';
import { Timeframe } from './types';

export function getTimeframe(input: string): Timeframe {
  const parts = input.split('=').map((a) => a.trim());
  return parts.length === 1
    ? getTimeframeFromDuration(parts[0])
    : getTimeframeFromRange(parts[0], parts[1]);
}

function getTimeframeFromRange(fromDate: string, toDate: string): Timeframe {
  const from = Date.parse(fromDate);
  const to = Date.parse(toDate);
  return {
    from: new Date(from),
    to: new Date(to),
  };
}

function getTimeframeFromDuration(input: string): Timeframe {
  const to = Date.now();
  const from = to - ms(input);
  return {
    from: new Date(from),
    to: new Date(to),
  };
}
