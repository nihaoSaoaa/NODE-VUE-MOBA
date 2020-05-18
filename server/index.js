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
app.use('/admin', express.static(__dirname + '/admin'))
app.use('/', express.static(__dirname + '/mall'))

require('./plugins/db')(app)
require('./routes/admin')(app)
// require('./routes/mall')(app)

app.listen(port, () =>  console.log('http://localhost:3000'))