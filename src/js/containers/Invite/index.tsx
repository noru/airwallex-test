import React from 'react'
import { translate } from 'react-i18next'
import { connect } from 'dva'
import { flow } from 'noru-utils/lib'
import Modal from '../../components/Modal'
import classname from 'classname'
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

interface State {
  showModal: boolean,
}

export class Login extends React.Component<any, State> {

  state = {
    showModal: false,
  }

  openModal = () => {
    this.setState({ showModal: true })
  }

  closeModal = () => {
    this.setState({ showModal: false })
  }

  invite = () => {
    let { dispatch } = this.props
    dispatch({ type: 'invite/get/invite-response'})
  }

  done = () => {
    let { dispatch } = this.props
    dispatch({ type: 'invite/set/invite-response'})
    this.closeModal()
  }

  render() {
    let { t, inviteResponse, loading } = this.props // 't' is for i18n, for simplicity I cut corner.
    let { showModal } = this.state
    return (
      <div className="page-invite">
        <Header t={t}/>
        <div className="invite-content">
          <div className="main-title">{t`A better way to enjoy everday.`}</div>
          <div className="sub-title">{t`Be the first to know when we launch.`}</div>
          <a className="button" onClick={this.openModal}>{t`Request an invite`}</a>
        </div>
        <Footer t={t}/>
        <Modal show={showModal} onClose={this.closeModal}>
          <div className="invite-form-wrapper">
            <div className="invite-form">
              { inviteResponse
                ? <>
                  <div className="form-title">{'errocode' ? t`Ooops...` : t`All done`}</div>
                  <div>{'errorcode'
                    ? t`error message`
                    : t`You will be one of the first to experience Broccoli & Co. when we launch.`
                  }
                  </div>
                  <a
                    className={classname('button', loading && 'is-loading')}
                    onClick={this.done}
                  >
                    {t`Ok`}
                  </a>
                </>
                : <>
                  <div className="form-title">{t`Request an invite`}</div>
                  <input className="input" type="text" placeholder={t`Full name`} />
                  <input className="input" type="text" placeholder={t`Email`} />
                  <input className="input" type="text" placeholder={t`Confirm Email`} />
                  <a
                    className={classname('button is-primary', loading && 'is-loading')}
                    onClick={this.invite}
                  >
                    {t`Send`}
                  </a>
                </>
              }
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}
function mapState2Props({ invite, loading }) {
  return {
    inviteResponse: invite.inviteResponse,
    loading: loading.effects['invite/get/invite-response'],
  }
}
export default flow(
  Login,
  translate(),
  connect(mapState2Props),
)