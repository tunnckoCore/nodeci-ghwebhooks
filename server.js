'use strict'

var GitHub = require('github-base')
var github = new GitHub({
  token: 'a896d378bd09d09ffb1fd9368b2c2c0393506164'
})

var Koa = require('koa')
var port = process.env.PORT || 8080
var app = new Koa()

app.use(function (ctx, next) {
  ctx.body = '<h1>Hello</h1>'
  ctx.type = 'html'
  return next()
})

app.use(function (ctx, next) {
  if (ctx.url === '/webhooks') {
    github.post('/repos/tunnckoCore/nodeci-ghwebhooks/issues', {
      title: 'foo bar ' + (new Date()),
      body: 'posting from my dev machine.. herkou maybe: ' + (new Date())
    }, function (err, res) {
      if (err) {
        ctx.body = 'err'
      } else {
        ctx.body = 'ok'
      }
      ctx.type = 'html'
      next()
    })
  } else {
    return next()
  }
})

app.listen(port, () => {
  console.log(`Server start listening on port ${port}`)
})

// github.post('/repos/tunnckoCore/nodeci-ghwebhooks/hooks', {
//   name: 'web',
//   active: true,
//   events: ['push', 'pull_request'],
//   config: {
//     url: 'https://nodeci-io-heroku.herokuapp.com/webhooks',
//     content_type: 'json'
//   }
// }, function (err, res) {
//   console.log(res)
// })
