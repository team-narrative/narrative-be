const User = require('../models/User');
const jwksRsa = require('jwks-rsa');
const jwt = require ('express-jwt');


const ensureAuth = () => jwt({
  credentialsRequired: process.env.NODE_ENV !== 'test',
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 10,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),
  audience: process.env.AUTH0_CLIENT_ID,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algoriths: ['RS256']
});

const checkAuth = () => (req, res, next) => {
  User
    .findOne({ userId: req.user.sub })
    .then(user => {
      req.narrativeUser = user;
    });
};

module.export = {
  ensureAuth,
  checkAuth
};