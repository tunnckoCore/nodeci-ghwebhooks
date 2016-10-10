'use strict'

var Koa = require('koa')
var port = process.env.PORT || 8080
var app = new Koa()

app.use(function (ctx, next) {
  ctx.body = '<h1>Hello</h1>'
  ctx.type = 'html'
  return next()
})

app.listen(port, () => {
  console.log(`Server start listening http://${host}:${port}`)
})
