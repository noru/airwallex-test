import React from 'react'
import { translate } from 'react-i18next'
import { connect } from 'dva'
import { flow } from 'noru-utils/lib'
import './index.scss'

function Header({ t }) {
  return (
    <div className="invite-header">{t`Broccoli & Co.`}</div>
  )
}

function Footer({ t }) {
  return (
    <div className="invite-footer">
      <div>{t`Made with ❤️ in Melbourne`}</div>
      <div>{t`© 2016 Broccoli & Co. All rights reserved.`}</div>
    </div>
  )
}

export class Login extends React.Component<any, any> {

  onInvite = () => {
    // let { dispatch } = this.props
    // dispatch({ type: 'invite/get/invite-response'})
    console.log('invite button clicked')
  }

  render() {
    let { t } = this.props // it's for i18n, for simplicity I cut corner.
    return (
      <div className="page-invite">
        <Header t={t}/>
        <div className="invite-content">
          <div className="main-title">{t`A better way to enjoy everday.`}</div>
          <div className="sub-title">{t`Be the first to know when we launch.`}</div>
          <a className="button" onClick={this.onInvite}>{t`Request an invite`}</a>
        </div>
        <span>{JSON.stringify(this.props.inviteResponse)}</span>
        <Footer t={t}/>
      </div>
    )
  }
}

export default flow(
  Login,
  translate(),
  connect(({ invite: { inviteResponse }}) => ({ inviteResponse })),
)