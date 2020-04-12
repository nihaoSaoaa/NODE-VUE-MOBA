module.exports = () => {
  const assert = require('http-assert')
  const jwt = require('jsonwebtoken')
  const AdminUser = require('../models/AdminUser')
  return async (req, res, next) => {
    // 获取 token
    const token = String(req.headers.authorization || '').split(' ').pop()
    assert(token, 401, '请先登录')
    // 校验 token 获取 id
    console.log(token);
    const { id } = jwt.verify(token, req.app.get('SECRET'))
    assert(id, 401, '请先登录')
    // 校验 id
    req.user = await AdminUser.findById(id)
    assert(req.user, 401, '请先登录')
    await next()
  }
}