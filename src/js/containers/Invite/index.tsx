import React from 'react'
import { translate } from 'react-i18next'
import { connect } from 'dva'
import { flow } from 'noru-utils/lib'
import Modal from '../../components/Modal'
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap_white.css'
import classname from 'classname'
import { LocalForm, Control } from 'react-redux-form'
import './index.scss'
import { InviteResponse } from '../../models/invite'

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

function ErrorMsg({ response }: { response: InviteResponse}) {
  if (response && response.status !== 200) {
    return <div className="notification is-danger">{response.msg}</div>
  }
  return null
}

interface State {
  showModal: boolean,
  fullnameError: string,
  emailError: string,
  confirmError: string,
}

export class Login extends React.Component<any, State> {

  state = {
    showModal: false,
    fullnameError: '',
    emailError: '',
    confirmError: '',
  }

  formDispatch: any

  openModal = () => {
    this.setState({ showModal: true })
  }

  closeModal = () => {
    this.setState({ showModal: false })
  }

  invite = (fullname, email) => {
    let { dispatch } = this.props
    dispatch({ type: 'invite/set/invite-response'})
    dispatch({ type: 'invite/get/invite-response', payload: { fullname, email }})
  }

  done = () => {
    let { dispatch } = this.props
    dispatch({ type: 'invite/set/invite-response'})
    this.closeModal()
  }

  extractErrors = ({fullname, email, confirm, $form}) => {
    let { t } = this.props
    let fullnameError, emailError, confirmError
    if (fullname.touched && !fullname.valid && !fullname.focus) {
      fullname.errors.length && // ignore `required`, browser will handle this
      (fullnameError = t`At least 3 characters`)
    }
    if (email.touched && !email.valid && !email.focus) {
      email.errors.typeMismatch &&
      (emailError = t`Invalid email`)
    }
    if (confirm.touched && !confirm.focus && $form.errors.emailMatch) {
      confirmError = t`Confirm email doesn't match`
    }
      // others no longer matters, ignore
    this.setState({ fullnameError, emailError, confirmError })
  }

  render() {
    let { t, inviteResponse, loading } = this.props // 't' is for i18n, for simplicity I cut corner.
    let { showModal, fullnameError, emailError, confirmError } = this.state

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
              { inviteResponse && inviteResponse.status === 200
                ? <>
                  <div className="form-title">{t`All done`}</div>
                  <div className="success-msg">{
                    t`You will be one of the first to experience Broccoli & Co. when we launch.`
                  }</div>
                  <a
                    className={classname('button', loading && 'is-loading')}
                    onClick={this.done}
                  >
                    {t`Ok`}
                  </a>
                </>
                : <LocalForm
                    initialState={{ fullname: '', email: '', confirm: '' }}
                    onUpdate={form => this.extractErrors(form)}
                    // onChange={values => console.log(values)}
                    onSubmit={({ fullname, email }) => this.invite(fullname, email)}
                    getDispatch={d => this.formDispatch = d}
                    validators={{
                      '': {
                        emailMatch: (vals) => vals.email === vals.confirm,
                      },
                    }}
                  >
                    <div className="form-title">{t`Request an invite`}</div>
                    <Tooltip
                      visible={!!fullnameError}
                      placement="top"
                      overlay={<span>{fullnameError}</span>}>
                      <Control.text
                        className="input"
                        model=".fullname"
                        placeholder={t`Full name`}
                        validators={{
                          length: (val) => val && val.length >= 3,
                        }}
                        required
                        />
                    </Tooltip>
                    <Tooltip
                      visible={!!emailError}
                      placement="top"
                      overlay={<span>{emailError}</span>}
                    >
                      <Control.text
                        className="input"
                        model=".email"
                        type="email"
                        placeholder={t`Email`}
                        required
                      />
                    </Tooltip>
                    <Tooltip
                      visible={!!confirmError}
                      placement="top"
                      overlay={<span>{confirmError}</span>}
                    >
                      <Control.text
                        className="input"
                        model=".confirm"
                        type="email"
                        placeholder={t`Confirm Email`}
                        validators={{
                          length: (val) => val && val.length >= 3,
                        }}
                        required
                      />
                    </Tooltip>
                    <ErrorMsg response={inviteResponse}/>
                    <button
                      type="submit"
                      className={classname('button is-primary', loading && 'is-loading')}
                    >
                      {t`Send`}
                    </button>
                </LocalForm>
              }
            </div>
          </div>
        </Modal>
      </div >
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