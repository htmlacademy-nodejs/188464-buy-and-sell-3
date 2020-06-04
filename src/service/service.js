'use strict';
const cli = require(`sywac`);
const chalk = require(`chalk`);
const {version} = require(`../../package`);
const {generate} = require(`./generate`);
const {start} = require(`./server`);

cli.style({
  usagePrefix: (str) => chalk.gray(str),
  usageCommandPlaceholder: (str) => chalk.gray(str),
  usagePositionals: (str) => chalk.gray(str),
  usageArgsPlaceholder: (str) => chalk.gray(str),
  usageOptionsPlaceholder: () => chalk.gray(`<command>`),
  desc: (str) => chalk.gray(str),
  flags: (str) => chalk.gray(str),
  group: (str) => chalk.gray(str),
  messages: (str) => chalk.red(str),
  hints: () => ``,
})
.usage({
  prefix: `Usage:\n  $0`,
  commandPlaceholder: `<command>`,
})
.preface(`Program launches http-server and generates a data file for API.`)
.number(`-g, --generate <count>`, {desc: `Generate mocks.json`})
.number(`-s, --server [port]`, {desc: `Start server`})
.help(`-h, --help`, {desc: `Print this text`})
.boolean(`-v, --version`, {desc: `Show version`})
.showHelpByDefault()
.outputSettings({maxWidth: 75});


cli.parseAndExit()
.then((parsed) => {
  if (parsed.version) {
    console.log(chalk.blue(version));
  } else if (parsed.generate !== undefined) {
    generate(parsed.generate);
  } else if (parsed.server !== undefined) {
    start(parsed.server);
  } else {
    throw Error(`unknown option`);
  }
}).catch((err) => {
  console.log(chalk.red(err));
  process.exit(1);
});
