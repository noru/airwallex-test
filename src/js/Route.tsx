import * as React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'
import Invite from './containers/Invite'
import NotFound from './containers/NotFound'
// import dynamic from 'dva/dynamic'

export default function() {

    return (
      <I18nextProvider i18n={i18n}>
        <Router>
          <Switch>
            <Route exact path="/" component={Invite} />
            <Route exact path="*" component={NotFound} />
          </Switch>
        </Router>
      </I18nextProvider>
    )

}
