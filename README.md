# show-my-stuff

[![npm version](https://badge.fury.io/js/show-my-stuff.svg)](https://badge.fury.io/js/show-my-stuff)
[![License](http://img.shields.io/:license-mit-blue.svg)](http://badges.mit-license.org)

---

This CLI tool will print your recent commits with links that you can share.

---

## Installation

```shell
$ npm install -g show-my-stuff
```

## Usage

Just run `show-my-stuff` in your git project.

By default commits from last 30 days will be printed.
You can set other timeframe with main argument, e.g. `show-my-stuff 7d` or `show-my-stuff 2022-01=2022-06`.

If you need some customization (like different link patterns or different output format) look into `show-my-stuff --help` to see available options.
