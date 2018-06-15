
import { ENDPOINT } from '../index'

export default function(mock) {
  mock.onPost(ENDPOINT)
    .reply(({ data }) => {
      // console.log(data)
      if (data.email === 'usedemail@airwallex.com') {
        return [400, { a: 1 }]
      } else {
        return [200, { b : 2 }]
      }
    })
}