'use strict'

var fs = require('fs')
var GitHub = require('github-base')
var github = new GitHub({
  token: 'c532c2a8d1ffc511ed3e5ee2a555cf0db7169972'
})

var Koa = require('koa')
var port = process.env.PORT || 8080
var app = new Koa()

app.use(function (ctx, next) {
  ctx.body = fs.createReadStream('./foo.html')
  ctx.type = 'html'
  return next()
})

// hooks/10259659/tests
app.use(function (ctx, next) {
  if (ctx.url === '/webhooks') {
    github.post('/repos/tunnckoCore/nodeci-ghwebhooks/issues', {
      title: 'foo ' + (new Date()),
      body: 'some body on ' + (new Date())
    }, function (err, res) {
      if (res.documentation_url) {
        throw new Error('err: ' + res.message)
        return next()
      }
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
