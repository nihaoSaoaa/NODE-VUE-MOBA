const express = require('express')
const cors = require('cors')
const history = require('connect-history-api-fallback')
const app = express()
const port = 3000
// 模拟全局秘钥
app.set('SECRET', 'i2u34y12oi3u4y8')
// 跨域
app.use(cors())
// 数据 json 化
app.use(express.json())
// history模式兼容
app.use(history({
  rewrites: [
    { from: /^\/(home|cart|category|profile:id|detail:id)\/.*$/, to: './mall/index.html' },
    { from: /^\/admin\/.*$/, to: './admin/index.html' }
  ]
}))

// 静态文件可访问
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use('/admin', express.static(__dirname + '/admin'))
app.use('/', express.static(__dirname + '/mall'))

require('./plugins/db')(app)
require('./routes/admin')(app)
// require('./routes/mall')(app)

app.listen(port, () =>  console.log('http://localhost:3000'))