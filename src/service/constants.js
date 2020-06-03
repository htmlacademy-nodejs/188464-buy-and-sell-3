'use strict';

const path = require(`path`);
const MOCK_FILE_NAME = `mocks.json`;
const MOCK_PATH = path.resolve(__dirname, `../../${MOCK_FILE_NAME}`);

module.exports = {
  MOCK_FILE_NAME,
  MOCK_PATH,
};
