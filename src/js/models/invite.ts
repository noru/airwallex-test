import API from '../services'
import produce from 'immer'
import { noop } from 'noru-utils/lib'

interface State {
  inviteResponse?: any,
}

export default {

  namespace: 'invite',
  state: produce({}, noop) as State,

  effects: {
    *'get/invite-response'({ param }, { put, call }) {
      const { data } = yield call(API.invite, param)
      yield put({
        type: 'set/invite-response',
        payload: data,
      })
    },
  },

  reducers: {
    'set/invite-response'(state, { payload }) {
      return produce(state, draft => { draft.inviteResponse = payload })
    },
  },

}