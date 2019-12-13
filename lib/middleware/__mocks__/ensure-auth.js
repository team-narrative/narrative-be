module.exports = async(req, res, next) => {
  req.user = {
    id: '7890',
    name: 'p',
    image: 'k.png'
  };
  return next();

};
