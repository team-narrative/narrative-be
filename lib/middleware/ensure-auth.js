const admin = require('../admin');

module.exports = async(req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  try {
    const userInfo = await admin
      .auth()
      .verifyIdToken(token);
    console.log(userInfo);
    // eslint-disable-next-line require-atomic-updates
    req.user = {
      id: userInfo.uid,
      name: userInfo.name,
      image: userInfo.picture
    };
    return next();
  } catch(e) {
    return res
      .status(401)
      .send({ error: 'You are not authorized to make this request' });
  }
};
