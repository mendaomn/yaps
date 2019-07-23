const yasp = require('../index.js')

test('it can pubsub', () => {
  const sub = jest.fn()
  yasp.sub('click', sub)
  yasp.pub('click', 42)

  expect(sub).toHaveBeenCalledTimes(1)
  expect(sub).toHaveBeenCalledWith(42)
})

test('it can handle many subs', () => {
  const sub1 = jest.fn()
  const sub2 = jest.fn()
  yasp.sub('click', sub1)
  yasp.sub('click', sub2)
  yasp.pub('click', 42)

  expect(sub1).toHaveBeenCalledTimes(1)
  expect(sub1).toHaveBeenCalledWith(42)
  expect(sub2).toHaveBeenCalledTimes(1)
  expect(sub2).toHaveBeenCalledWith(42)
})

test('any object can be a pubsub', () => {
  const mixin = (obj1, obj2) => ({
    ...obj1,
    ...obj2
  })

  const button = mixin(yasp, {})

  button.fire = button.pub
  button.on = button.sub

  const sub = jest.fn()
  
  button.on('click', sub)
  button.fire('click', 23)

  expect(sub).toHaveBeenCalledTimes(1)
  expect(sub).toHaveBeenCalledWith(23)
})