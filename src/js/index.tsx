// dependencies
import dva from 'dva'
import createLoading from 'dva-loading'
import './polyfills'
// components & stores
import Route from './Route'
// stylesheets
import 'css/main'

const app = dva({
  onError(e) {
    console.error(e.message)
  },
})
app.use(createLoading())
app.router(Route as any)
app.start('#app')

export default app