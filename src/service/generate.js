'use strict';

const fs = require(`fs`);
const path = require(`path`);
const {shuffle, getRandomInt, getRandomItem} = require(`./utils`);
const FILE_NAME = `mocks.json`;

const titles = [`Продам книги Стивена Кинга.`, `Продам новую приставку Sony Playstation 5.`, `Продам отличную подборку фильмов на VHS.`, `Куплю антиквариат.`, `Куплю породистого кота.`, `Продам коллекцию журналов «Огонёк».`, `Отдам в хорошие руки подшивку «Мурзилка».`, `Продам советскую посуду. Почти не разбита.`, `Куплю детские санки.`];
const descriptions = [`Товар в отличном состоянии.`, `Пользовались бережно и только по большим праздникам.`, `Продаю с болью в сердце...`, `Бонусом отдам все аксессуары.`, `Даю недельную гарантию.`, `Если товар не понравится — верну всё до последней копейки.`, `Это настоящая находка для коллекционера!`, `Если найдёте дешевле — сброшу цену.`, `Таких предложений больше нет!`, `Две страницы заляпаны свежим кофе.`, `При покупке с меня бесплатная доставка в черте города.`, `Кажется, что это хрупкая вещь.`, `Мой дед не мог её сломать.`, `Кому нужен этот новый телефон, если тут такое...`, `Не пытайтесь торговаться. Цену вещам я знаю.`];
const types = [`offer`, `sale`];
const categories = [`Книги`, `Разное`, `Посуда`, `Игры`, `Животные`, `Журналы`];

const makeTitle = () => {
  return getRandomItem(titles);
};

const makeDescription = () => {
  const MAX_COUNT = 5;
  return shuffle(descriptions).slice(0, getRandomInt(1, MAX_COUNT)).join(` `);
};

const makeCategory = () => {
  return shuffle(categories).slice(0, getRandomInt(1, categories.length - 1));
};

const makeSum = () => {
  const MIN_COUNT = 1000;
  const MAX_COUNT = 100000;
  return getRandomInt(MIN_COUNT, MAX_COUNT);
};

const makeType = () => getRandomItem(types);

const makePicture = () => {
  const MIN_COUNT = 1;
  const MAX_COUNT = 16;
  const count = getRandomInt(MIN_COUNT, MAX_COUNT);
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

const generateMock = (count) => {
  const mock = [...new Array(count)].map(generateOne);
  const mockPath = path.resolve(__dirname, FILE_NAME);
  fs.writeFileSync(mockPath, JSON.stringify(mock, null, 4), (err) => {
    if (err) {
      console.error(`Can't write data to file ${FILE_NAME}`);
      process.exit(1);
    }
    console.info(`${FILE_NAME} created`);
  });
};


const generate = (value) => {
  const MIN_COUNT = 1;
  const MAX_COUNT = 1000;

  const parsedValue = Number.parseInt(value, 10);
  const count = parsedValue ? parsedValue : MIN_COUNT;
  if (count > MAX_COUNT) {
    console.error(`No more than ${MAX_COUNT} ads`);
    process.exit(1);
  } else if (count < 0) {
    console.error(`Count must be positive integer`);
    process.exit(1);
  }
  generateMock(count);
};

module.exports = {
  generate,
};
