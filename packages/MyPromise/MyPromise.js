const STATE = {
  FULFILLED: "fulfilled",
  PENDING: "pending",
  REJECTED: "rejected",
}

class MyPromise {
  #thenCallbacks = []
  #catchCallbacks = []
  #state = STATE.PENDING
  #value

  // new Promise((resolve, reject) => {})
  // cb is run immediately on creating a new Promise
  constructor(cb) {
    try {
      cb(this.#onSuccess, this.#onFail)
    } catch (e) {
      this.#onFail(e)
    }
  }

  // we need to save this to call after the cb in the constructor worked
  then(cb) {
    this.#thenCallbacks.push(cb)
    cb()
    return this
  }

  catch(cb) {
    this.#catchCallbacks.push(cb)
    return this
  }

  finally(cb) {
    cb()
  }

  #onSuccess(value) {
    if (this.#state !== STATE.PENDING) return
    this.#value = value
    this.#state = STATE.FULFILLED
    this.#runCallbacks()
  }

  #onFail(value) {
    if (this.#state !== STATE.PENDING) return
    this.#value = value
    this.#state = STATE.REJECTED
    this.#runCallbacks()
  }

  #runCallbacks() {
    if (this.#state === STATE.FULFILLED) {
      this.#thenCallbacks.forEach((cb) => cb(this.#value))
      // reset otherwise call the p.then().then() and then another p.then(), the first 2 will get recalled
      this.#thenCallbacks = []
    }

    if (this.#state === STATE.REJECTED) {
      this.#catchCallbacks.forEach((cb) => cb(this.#value))
      this.#catchCallbacks = []
    }
  }

}

/**
 * const p = new MyPromise()
 * p.then(cb1).then(cb2)
 * 
 * We can chain thens. We want to save it and then call it in #onSuccess
 * 
 * You can only call resolve and reject once.
 */


module.exports = MyPromise