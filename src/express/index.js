'use strict';

const express = require(`express`);
const app = express();
const PORT = 8080;
const {rootRouter} = require(`./routes`);

app.use(rootRouter);

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
