#!/usr/bin/env node

const program = require('commander');
const { showMyStuff, version } = require('../lib');

program
  .name('show-my-stuff')
  .description('Your commits with shareable links.')
  .version(version())
  .arguments('[timeframe]', 'timeframe for your stuff (default: 30d)')
  .option('--json', 'output as json')
  .option(
    '-p, --pattern <pattern>',
    'pattern for generated links (e.g. `{protocol}://{host}/{org}/{project}/commits/{sha}`)',
  )
  .option('-r, --reverse', 'sort from oldest commit first')
  .option('-t, --type <type>', 'optional git provider (github, gitlab, bitbucket)')
  .action(async (timeframe, opts) => {
    const logs = await showMyStuff({
      timeframe: timeframe ?? '30d',
      formatter: opts.json ? 'json' : 'text',
      provider: opts.type ?? 'unknown',
      pattern: opts.pattern || null,
      reverse: opts.reverse || false,
    });

    // eslint-disable-next-line no-console
    console.log(logs);
  });

program.parse(process.argv);
