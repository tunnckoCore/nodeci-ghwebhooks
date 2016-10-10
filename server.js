'use strict'

var GitHub = require('github-base')
var github = new GitHub({
  token: '055d0a55da16a943505425824b028470d9688d22'
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
    github.post('/repos/tunnckoCore/nodeci-ghwebhooks/hooks/10259659/tests',
    function (err, res) {
      if (res.documentation_url) {
        ctx.body = 'err'
        return next()
      }
      ctx.body = JSON.stringify({foo: 'bar'}, null, 2)
      console.log('res', res)
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
