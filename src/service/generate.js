'use strict';

const fsPromises = require(`fs`).promises;
const path = require(`path`);
const chalk = require(`chalk`);
const {shuffle, getRandomInt, getRandomItem} = require(`./utils`);
const FILE_NAME = `mocks.json`;

const MIN_SUM_VALUE = 1000;
const MAX_SUM_VALUE = 100000;

const MIN_PIC_NUM = 1;
const MAX_PIC_NUM = 16;

const MAX_DESCRIPTION_COUNT = 5;

const MIN_MOCK_COUNT = 1;
const MAX_MOCK_COUNT = 1000;

const titles = [`Продам книги Стивена Кинга.`, `Продам новую приставку Sony Playstation 5.`, `Продам отличную подборку фильмов на VHS.`, `Куплю антиквариат.`, `Куплю породистого кота.`, `Продам коллекцию журналов «Огонёк».`, `Отдам в хорошие руки подшивку «Мурзилка».`, `Продам советскую посуду. Почти не разбита.`, `Куплю детские санки.`];
const descriptions = [`Товар в отличном состоянии.`, `Пользовались бережно и только по большим праздникам.`, `Продаю с болью в сердце...`, `Бонусом отдам все аксессуары.`, `Даю недельную гарантию.`, `Если товар не понравится — верну всё до последней копейки.`, `Это настоящая находка для коллекционера!`, `Если найдёте дешевле — сброшу цену.`, `Таких предложений больше нет!`, `Две страницы заляпаны свежим кофе.`, `При покупке с меня бесплатная доставка в черте города.`, `Кажется, что это хрупкая вещь.`, `Мой дед не мог её сломать.`, `Кому нужен этот новый телефон, если тут такое...`, `Не пытайтесь торговаться. Цену вещам я знаю.`];
const types = [`offer`, `sale`];
const categories = [`Книги`, `Разное`, `Посуда`, `Игры`, `Животные`, `Журналы`];

const makeTitle = () => getRandomItem(titles);
const makeDescription = () => shuffle(descriptions, getRandomInt(1, MAX_DESCRIPTION_COUNT)).join(` `);
const makeCategory = () => shuffle(categories, getRandomInt(1, categories.length));
const makeSum = () => getRandomInt(MIN_SUM_VALUE, MAX_SUM_VALUE);
const makeType = () => getRandomItem(types);

const makePicture = () => {
  const count = getRandomInt(MIN_PIC_NUM, MAX_PIC_NUM);
  return `item${count > 9 ? count : `0${count}`}.jpg`;
};

const generateOne = () => ({
  type: makeType(),
  title: makeTitle(),
  description: makeDescription(),
  sum: makeSum(),
  picture: makePicture(),
  category: makeCategory(),
});

const generateMock = async (count) => {
  const mock = [...new Array(count)].map(generateOne);
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
