const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
// 模拟全局秘钥
app.set('SECRET', 'i2u34y12oi3u4y8')

app.use(cors())
app.use(express.json())

// 静态文件可访问
app.use('/uploads', express.static(__dirname + '/uploads'))

require('./plugins/db')(app)
require('./routes/admin/index')(app)
// require('./routes/web')(app)

app.listen(port, () =>  console.log('http://localhost:3000'))