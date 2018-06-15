import React from 'react'
import { translate } from 'react-i18next'
import { connect } from 'dva'
import { flow } from 'noru-utils/lib'

export class Login extends React.Component<any, any> {

  click = () => {
    let { dispatch } = this.props
    dispatch({ type: 'invite/get/invite-response'})
  }

  render() {
    return (
      <div onClick={this.click}>
        stub
        <span>{JSON.stringify(this.props.inviteResponse)}</span>
      </div>
    )
  }
}

export default flow(
  Login,
  translate(),
  connect(({ invite: { inviteResponse }}) => ({ inviteResponse })),
)