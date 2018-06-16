import axios from 'axios'
import { load } from './mocks/helper'

if (__USE_MOCK__) {
  load('./index')
}

export const ENDPOINT = 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth'

class LoginService {
  invite(name: string, email: string): Promise<any> {
    return axios.post(ENDPOINT, { name, email })
      .then(() => ({ status: 200 }))
      .catch(e => ({ status: e.response.status, msg: e.response.data.errorMessage }))
  }
}

export default new LoginService
