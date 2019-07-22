function test(title, cb) {
  try {
    cb()
    console.log('PASS: ', title)
  } catch(err) {
    console.error('FAIL: ', title)
    console.error("")
    console.error(err)
  }
}

function expect(value) {
  return {
    toBe(other) {
      if (value !== other) throw new Error(`${value} is not equal to ${other}`)
    },
    toEqual(other) {
      const valueString = JSON.stringify(value)
      const otherString = JSON.stringify(other)
      if (valueString !== otherString) throw new Error(`${valueString} is not equal to ${otherString}`)
    }
  }
}

function spy() {
  function mock(args) {
    mock.__mock.calls++
    mock.__mock.args = args
  }

  mock.__mock = {
    calls: 0,
    args: undefined
  }

  return mock
}

module.exports = {
  test,
  expect,
  spy
}