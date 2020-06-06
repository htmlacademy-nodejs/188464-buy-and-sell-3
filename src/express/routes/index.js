'use strict';
const {Router} = require(`express`);

const page = (req, res) => {
  res.send(req.baseUrl + req.route.path);
};

const rootRouter = new Router();
rootRouter.get(`/`, page);

const registerRouter = new Router();
registerRouter.get(`/`, page);

const searchRouter = new Router();
searchRouter.get(`/`, page);

const loginRouter = new Router();
loginRouter.get(`/`, page);

const offersRouter = new Router();
offersRouter.get(`/category/:id`, page);
offersRouter.get(`/add`, page);
offersRouter.get(`/edit/:id`, page);
offersRouter.get(`/:id`, page);

const myRouter = new Router();
myRouter.get(`/`, page);
myRouter.get(`/comments`, page);


rootRouter.use(`/register`, registerRouter);
rootRouter.use(`/login`, loginRouter);
rootRouter.use(`/search`, searchRouter);
rootRouter.use(`/offers`, offersRouter);
rootRouter.use(`/my`, myRouter);

module.exports = {rootRouter};
