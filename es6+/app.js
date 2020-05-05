import Koa from 'koa'
import path from 'path'
import BodyParser from 'koa-bodyparser'
import Views from 'koa-ejs'
import Static from 'koa-static'
import webpackConfig from './webpack.config'
import webpack from 'webpack'
import webpackDevMiddleware from 'koa-webpack-dev-middleware'
import webpackHotMiddleware from 'koa-webpack-hot-middleware'
import MainRouter from './routes/main'

const PORT = 8080

const app = new Koa()

Views(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'ejs',
  cache: false,
  debug: false
})

const compiler = webpack(webpackConfig)

const wdm = webpackDevMiddleware(compiler, {
  noInfo: true
  // publicPath: config.output.publicPath
})
app.use(wdm)
app.use(webpackHotMiddleware(compiler))
app.use(Static(path.join(__dirname, 'static')))
app.use(BodyParser())

app.use(MainRouter.routes()).use(MainRouter.allowedMethods())
app.listen(PORT, () => {
  global.console.log(`server is listen, http://localhost:${PORT}`)
})
