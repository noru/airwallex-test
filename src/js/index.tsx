// dependencies
import dva from 'dva'
import createLoading from 'dva-loading'
import './polyfills'
import inviteModel from './models/invite'
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
app.model(inviteModel as any)
app.router(Route as any)
app.start('#app')

export default app
