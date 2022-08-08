export interface Formatter {
  format(logs: Log[]): string;
}

export interface ShowMyStuffOpts {
  timeframe: string;
  provider: Provider;
  formatter: string;
  pattern?: string;
  reverse?: boolean;
}

export interface Log {
  title: string;
  description?: string;
  date: string;
  link: string;
}

export interface Context {
  timeframe: Timeframe;
  repository: Repository;
  linkPattern: string;
  formatter: Formatter;
  user: {
    name: string;
    email: string;
  };
}

export interface Repository {
  type: Provider;
  protocol: 'http' | 'https';
  host: string;
  org: string;
  project: string;
}

export type Provider = 'github' | 'bitbucket' | 'gitlab' | 'unknown';

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export type Timeframe = {
  from: Date;
  to: Date;
};
