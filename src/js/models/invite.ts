import API from '../services'
import produce from 'immer'
import { noop } from 'noru-utils/lib'

export interface InviteResponse {
  status: number,
  msg?: string,
}
interface State {
  inviteResponse?: InviteResponse,
}

export default {

  namespace: 'invite',
  state: produce({}, noop) as State,

  effects: {
    *'get/invite-response'({ payload: { fullname, email } }, { put, call }) {
      const response = yield call(API.invite, fullname, email)
      yield put({
        type: 'set/invite-response',
        payload: response,
      })
    },
  },

  reducers: {
    'set/invite-response'(state, { payload }) {
      return produce(state, draft => { draft.inviteResponse = payload })
    },
  },

}