const isString = require('../helpers/stringHelper.js').isString;

const checkRequestIdMiddleware = (req, res, next) => {
  const id = req.params.id;

  if (!id || !isString(id)) {
    return res.status(400).send('Id should be valid');
  }

  next();
};

const userParamsValidationMiddleware = (req, res, next) => {
  const { name, login, password } = req.body;
  const bodyParamsCollection = [name, login, password];

  bodyParamsCollection.forEach(param => {
    const isStringParam = isString(param);

    if (!param || !isStringParam) {
      return res.status(400).send('All params should be valid');
    }
  });

  next();
};

module.exports = {
  checkRequestIdMiddleware,
  userParamsValidationMiddleware
};
