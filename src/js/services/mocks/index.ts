
import { ENDPOINT } from '../index'

export default function(mock) {
  mock.onPost(ENDPOINT)
    .reply(({ data }) => {
      if (JSON.parse(data).email === 'usedemail@airwallex.com') {
        return [400, {errorMessage: 'Bad Request: Email is already in use'}]
      } else {
        return [200, 'Registered']
      }
    })
}