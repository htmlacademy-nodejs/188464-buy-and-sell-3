'use strict';
const {program} = require(`commander`);
const {version} = require(`../../package.json`);
const {generate} = require(`./generate`);

program
    .version(version)
    .description(`Program launches http-server and generates a data file for API.`)
    .name(`service.js`)
    .usage(`<command>`)
    .option(`-g, --generate [count]`, `generate mocks.json`)
    .helpOption(`-h, --help`, `print this text`)
    .parse(process.argv);

if (process.argv.length === 2) {
  program.help();
}

if (program.generate) {
  generate(program.generate);
}
