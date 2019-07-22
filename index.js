const pubsub = {

  __subs: {},

  pub(eventName, data) {
    this._getSubs(eventName).forEach(cb => cb(data))
  },

  sub(eventName, callback) {
    this._getSubs(eventName).push(callback)
  },

  _getSubs(eventName) {
    const subs = this.__subs[eventName]
    
    if (!subs) this.__subs[eventName] = []

    return this.__subs[eventName]
  }
}

module.exports = pubsub