import axios from 'axios'


const httpClient = axios.create()

class API {
  RPCCall(cmd) {
    return this.request('post', `/rpccall?cmd=${cmd}`)
  }

  request(method, path, params) {
    let options = {
      method,
      url: `http://localhost:5000${path}`
    }

    if (params) {
      if (method === 'get') {
        options.params = { params: JSON.stringify(params) }
      } else {
        options.data = params
      }
    }

    console.log(`[API] ${method} ${path}`, options)

    return httpClient.request(options)
      .catch(err => {
        let error
        console.log('RESPONSE ERROR', error)

        if (err.status === 401) {
          error = new AuthorizationError()
        } else {
          error = new Error('[API] HTTP request failed. Inspect this error for more info')
          Object.assign(error, err)
        }

        console.log(`[WARN] ${error.message}`)

        throw error
      })
  }
}


export class AuthorizationError {
  constructor() {
    this.status = 401
    this.message = 'Server rejected credentials. Logging out'
  }

  toString() {
    return this.message
  }
}


export default new API()
