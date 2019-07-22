const {test, expect, spy} = require('../lib/jest')
const yasp = require('../index.js')
// const yasp = require('../dist/index.min.js')

test('it can pubsub', () => {
  const sub = spy()
  yasp.sub('click', sub)
  yasp.pub('click', 42)

  expect(sub.__mock.calls).toBe(1)
  expect(sub.__mock.args).toBe(42)
})

test('it can handle many subs', () => {
  const sub1 = spy()
  const sub2 = spy()
  yasp.sub('click', sub1)
  yasp.sub('click', sub2)
  yasp.pub('click', 42)

  expect(sub1.__mock.calls).toBe(1)
  expect(sub1.__mock.args).toBe(42)
  expect(sub2.__mock.calls).toBe(1)
  expect(sub2.__mock.args).toBe(42)
})

test('any object can be a pubsub', () => {
  const mixin = (obj1, obj2) => ({
    ...obj1,
    ...obj2
  })

  const button = mixin(yasp, {})

  button.fire = button.pub
  button.on = button.sub

  const sub = spy()
  
  button.on('click', sub)
  button.fire('click', 23)

  expect(sub.__mock.calls).toBe(1)
  expect(sub.__mock.args).toBe(23)
})