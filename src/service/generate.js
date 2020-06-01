'use strict';

const fsPromises = require(`fs`).promises;
const path = require(`path`);
const chalk = require(`chalk`);
const {shuffle, getRandomInt, getRandomItem} = require(`./utils`);
const FILE_NAME = `mocks.json`;
const DATA_PATH = path.resolve(__dirname, `../../data`);
const DESCRIPTIONS_FILE = path.resolve(DATA_PATH, `sentences.txt`);
const TITLES_FILE = path.resolve(DATA_PATH, `titles.txt`);
const CATEGORIES_FILE = path.resolve(DATA_PATH, `categories.txt`);

const getDataFromFile = async (file) => {
  let data;
  try {
    data = await fsPromises.readFile(file, {encoding: `utf-8`});
  } catch (err) {
    console.error(chalk.red(err));
    process.exit(1);
  }
  return data.split(`\n`);
};

const getData = async () => {
  const [titles, categories, descriptions] = await Promise.all([
    getDataFromFile(TITLES_FILE),
    getDataFromFile(CATEGORIES_FILE),
    getDataFromFile(DESCRIPTIONS_FILE)
  ]);
  return {
    titles, categories, descriptions
  };
};

const MIN_SUM_VALUE = 1000;
const MAX_SUM_VALUE = 100000;

const MIN_PIC_NUM = 1;
const MAX_PIC_NUM = 16;

const MAX_DESCRIPTION_COUNT = 5;

const MIN_MOCK_COUNT = 1;
const MAX_MOCK_COUNT = 1000;

const types = [`offer`, `sale`];

const makeTitle = (titles) => getRandomItem(titles);
const makeDescription = (descriptions) => shuffle(descriptions, getRandomInt(1, MAX_DESCRIPTION_COUNT)).join(` `);
const makeCategory = (categories) => shuffle(categories, getRandomInt(1, categories.length));
const makeSum = () => getRandomInt(MIN_SUM_VALUE, MAX_SUM_VALUE);
const makeType = () => getRandomItem(types);

const makePicture = () => {
  const count = getRandomInt(MIN_PIC_NUM, MAX_PIC_NUM);
  return `item${count > 9 ? count : `0${count}`}.jpg`;
};

const generateOne = ({titles, categories, descriptions}) => ({
  type: makeType(),
  title: makeTitle(titles),
  description: makeDescription(descriptions),
  sum: makeSum(),
  picture: makePicture(),
  category: makeCategory(categories),
});

const generateMock = async (count) => {
  const mockData = await getData();
  const mock = [...new Array(count)].map(() => generateOne(mockData));
  const mockPath = path.resolve(__dirname, `../../${FILE_NAME}`);
  try {
    await fsPromises.writeFile(mockPath, JSON.stringify(mock, null, 4));
  } catch (err) {
    console.error(`Can't write data to file ${FILE_NAME}`);
    process.exit(1);
  }
  console.info(chalk.green(`${FILE_NAME} created`));
};


const generate = (value) => {
  const parsedValue = Number.parseInt(value, 10);
  const count = parsedValue || MIN_MOCK_COUNT;
  if (count > MAX_MOCK_COUNT) {
    console.error(chalk.red(`No more than ${MAX_MOCK_COUNT} ads`));
    process.exit(1);
  } else if (count < 0) {
    console.error(chalk.red(`Count must be positive integer`));
    process.exit(1);
  }
  generateMock(count);
};

module.exports = {
  generate,
};
