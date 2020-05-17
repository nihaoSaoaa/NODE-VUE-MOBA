module.exports = app => {
  const express = require('express')
  // http 错误断言
  const assert = require('http-assert')
  const jwt = require('jsonwebtoken')
  const AdminUser = require('../../models/AdminUser')
  const router = express.Router();
  //  文件上传库
  const multer =  require('multer')

  
   // 创建资源
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body);
    res.send(model);
  })

  // 资源列表
  router.get('/', async (req, res) => {
    const queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(100);
    res.send(items);
  })

  // 资源详情
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  // 删除资源
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndRemove(req.params.id, req.body)
    res.send({
      success: true
    });
  })
   // 更新资源
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  // 通用 crud 接口 + 中间件配置
  const authMiddleWare =  require('../../middleware/auth')
  const resourceMiddleWare = require('../../middleware/resource')
  app.use('/admin/api/rest/:resource', authMiddleWare(), resourceMiddleWare() , router)

  //文件上传接口
  const upload = multer({ 
    dest: __dirname + './../../uploads'
  })
  app.post('/admin/api/upload', authMiddleWare(), upload.single('file'), async (req, res, next) => {
    const file = req.file;
    file.url = `http://test.mjh.cool/uploads/${file.filename}`;
    res.send(file);
  })

  //登录接口
  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body;
    // 1. 查找用户
    const user = await AdminUser.findOne({username}).select('+password');
    assert(user, 422, '用户不存在');
    // 2. 校验密码
    const isValid = require("bcryptjs").compareSync(password, user.password);
    assert(isValid, 422, "密码不正确")
    // 3. 返回token
    const token = jwt.sign({ id: user._id }, app.get('SECRET'))
    res.send({ token })
  })

  // 错误处理 
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}