import axios from "axios";

import {store} from 'mobile/src/store'

import Path from './Path'

class Api {
  static signIn(email, password) {
    return axios.post(Path.signIn(), {
      email: email,
      password: password
    })
  }

  static signUp(email, password, passwordConfirmation) {
    return axios.post(Path.signUp(), {
      auth: {
        email: email,
        password: password,
        password_confirmation: passwordConfirmation
      }
    })
  }

  static home() {
    return this._request('get', Path.home())
  }

  static createBox(name, users) {
    return this._request('post', Path.boxes(), {box: {title: name}, users: users} )
  }

  static loadBox(boxId) {
    return this._request('get', Path.boxes(), {id: boxId})
  }

  static createPosition(data) {
    const body = {
      paid_by: data.participantId,
      title: data.title,
      amount: data.amount
    };

    return this._request('post', Path.positions(),{position: body} )
  }

  static selectPosition(data) {
    const body = {
      assigned_to: data.participantId,
    };

    return this._request('put', Path.position(data.positionId),)
  }

  static _request(method, url, body) {
    let config = {
      method: method,
      url: url,
      data: body
    };

    const token = store.getState().account.token;

    if(token) {
      config.headers = {
        Authorization: `Bearer ${token}`
      }
    }

    return axios.request(config)
  }
}

export { Api }