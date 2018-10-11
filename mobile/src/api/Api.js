import axios from "axios";

import Path from './Path'

class Api {
  static signIn(email, password) {
    return axios.post(Path.signIn(), {
      email: email,
      password: password
    })
  }
}

export { Api }