module.exports = () => async (req, res, next) => {
    // js 字符转换工具库
  const inflection =  require('inflection')
  const model = inflection.classify(req.params.resource);
  req.Model = require(`../models/${model}`);
  await next();
}