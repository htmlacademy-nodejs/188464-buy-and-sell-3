'use strict';
const {program} = require(`commander`);
const {version} = require(`../../package.json`);
const {generate} = require(`./generate`);

program
    .version(version)
    .option(`-g, --generate [count]`, `generates mocks.json`)
    .parse(process.argv);

if (process.argv.length === 2) {
  program.help();
}

if (program.generate) {
  generate(program.generate);
}
