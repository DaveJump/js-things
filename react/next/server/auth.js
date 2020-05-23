const axios = require('axios')
const { client_id, client_secret, access_url, api_url } = require('../config').githubOAuth

module.exports = server => {
  server.use(async (ctx, next) => {
    if (ctx.path === '/auth') {
      const code = ctx.query.code
      if (!code) {
        ctx.body = 'code not exist'
        return
      }
      const result = await axios({
        method: 'POST',
        url: access_url,
        data: {
          client_id,
          client_secret,
          code
        },
        headers: {
          Accept: 'application/json'
        }
      })

      if (result.status === 200 && result.data && !result.data.error) {
        const { access_token, token_type } = result.data
        const userInfoRes = await axios({
          method: 'GET',
          url: `${api_url}/user`,
          headers: {
            'Authorization': `${token_type} ${access_token}`
          }
        })
        // save userInfo to session
        ctx.session.userInfo = userInfoRes.data
        ctx.redirect('/')
      } else {
        const errorMsg = result.data && result.data.error
        ctx.body = `request token failed ${errorMsg}`
      }
    } else {
      await next()
    }
  })
}