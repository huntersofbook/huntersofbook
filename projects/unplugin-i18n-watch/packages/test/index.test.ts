import { expect, test } from 'vitest'

import { merge } from '../src/index'

test('two objects with different keys', () => {
  const schema = {
    one: 1,
    two: 2,
    three: 3,
  }

  const newData = {
    four: 4,
    five: 5,
  }
  const res = merge({ schema, newData })
  expect(res).toEqual({
    one: 1,
    two: 2,
    three: 3,
  },
  )
})

test('two object with one identical key where value is number', () => {
  const schema = {
    one: 1,
    two: 2,
    three: 3,
  }

  const newData = {
    three: 4,
    five: 5,
  }
  const res = merge({ schema, newData })
  expect(res).toEqual({
    one: 1,
    two: 2,
    three: 4,
  },
  )
})

test('two object with one identical key where value is string', () => {
  const schema = {
    one: 1,
    two: 2,
    name: 'a',
  }

  const newData = {
    four: 4,
    name: 'b',
  }
  const res = merge({ schema, newData })
  expect(res).toEqual({
    one: 1,
    two: 2,
    name: 'b',
  },
  )
})

test('two object with one identical key where value array of string', () => {
  const schema = {
    one: 1,
    two: 2,
    names: ['a', 'b'],
  }

  const newData = {
    four: 4,
    names: ['b', 'c', 'd'],
  }
  const res = merge({ schema, newData })
  expect(res).toEqual({
    one: 1,
    two: 2,
    names: ['a', 'b', 'c', 'd'],
  },
  )
})

test('two object with one identical key where value is array of objects', () => {
  const schema = {
    one: 1,
    two: 2,
    names: [{ a: 'b' }],
  }

  const newData = {
    four: 4,
    names: [{ a: 'hello', d: 't' }],
  }
  const res = merge({ schema, newData })
  expect(res).toEqual({
    one: 1,
    two: 2,
    names: [{ a: 'b' }, { a: 'hello', d: 't' }],
  },
  )
})

test('good question', () => {
  const schema = {
    one: 1,
    two: 2,
    readNotifications: [{ a: 'b' }, { t: 'd', a: 'name' }],
  }

  const oldDataDb = {
    four: 4,
    readNotifications: [{ a: 'hello', d: 't' }, { a: 'new' }],
  }

  const res = merge({ schema, newData: oldDataDb })
  expect(res).toEqual({
    one: 1,
    two: 2,
    readNotifications: [{ a: 'b' }, { t: 'd', a: 'name' }, { a: 'hello', d: 't' }, { a: 'new' }],
  },
  )
})

test('object in array', () => {
  const schema = {
    one: 1,
    two: 2,
    names: {
      one: [{ a: '1', d: '2' }],
      two: [{ a: '2', d: '1' }],
    },
  }

  const newData = {
    four: 4,
    names: {
      one: [{ a: 'hello', d: 't' }],
    },
  }
  const res = merge({ schema, newData })
  expect(res).toEqual({
    one: 1,
    two: 2,
    names: {
      one: [{ a: '1', d: '2' }, { a: 'hello', d: 't' }],
      two: [{ a: '2', d: '1' }],
    },
  },
  )
})

test('two object with one identical key where value is object', () => {
  const schema = {
    one: 1,
    two: 2,
    names: {
      firstName: 'a',
      middleName: 'b',
      lastName: 'c',
    },
  }

  const newData = {
    four: 4,
    names: {
      firstName: 'a',
      middleName: 'd',
      lastName: 'e',
    },
  }
  const res = merge({ schema, newData })
  expect(res).toEqual({
    one: 1,
    two: 2,
    names: {
      firstName: 'a',
      middleName: 'd',
      lastName: 'e',
    },
  },
  )
})

test('two object with one identical key where value is array of numbers', () => {
  const schema = {
    one: 1,
    two: 2,
    names: [1, 3],
  }

  const newData = {
    four: 4,
    names: [2],
  }
  const res = merge({ schema, newData })
  expect(res).toEqual({
    one: 1,
    two: 2,
    names: [1, 3, 2],
  },
  )
})

test('two object with one identical key where value is array of any type', () => {
  const schema = {
    one: 1,
    two: 2,
    names: [{ a: 'a' }, 3],
  }

  const newData = {
    four: 4,
    names: [2],
  }
  const res = merge({ schema, newData })
  expect(res).toEqual({
    one: 1,
    two: 2,
    names: [3, 2, { a: 'a' }],
  },
  )
})

test('two complex object with that involves almost all scenarios', () => {
  const schema = {
    one: 1,
    two: 2,
    other: {
      two: 'two',
      three: 3,
      five: {
        array: ['five'],
      },
    },

  }

  const newData = {
    four: 4,
    other: {
      three: 4,
      four: 4,
      five: {
        array: [5],
      },
    },
  }
  const res = merge({ schema, newData })
  expect(res).toEqual({
    one: 1,
    two: 2,
    other: {
      three: 4,
      two: 'two',
      five: {
        array: ['five', 5],
      },

    },
  },
  )
})

test('small object ', () => {
  const schema = {
    isPro: false,
    darkMode: false,
    pages: {
      home: false,
      settings: false,
    },
  }

  const newData = {
    isPro: false,
    darkMode: true,
    pages: {
      home: false,
      settings: true,
      hello: false,
    },
    dd: 'dd',
    tt: {
      dd: 'dd',
    },
    cc: [{ dd: 'dd' }],
  }
  const res = merge({ schema, newData })
  expect(res).toEqual({
    isPro: false,
    darkMode: true,
    pages: { home: false, settings: true },
  },
  )
})

test('middle object', () => {
  const schema = {
    isPro: false,
    darkMode: false,
    pages: {
      home: false,
      settings: false,
      test: {
        home: false,
        cc: {
          dd: 'TESt',
          ff: '000',
        },
      },
    },
  }

  const newData = {
    isPro: false,
    darkMode: false,
    pages: {
      home: false,
      settings: false,
      test: {
        home: true,
        cc: {
          dd: 'TEStBBBB',
          ff: '000',
          hello: 'world',
        },
      },
    },
    dd: 'dd',
    tt: {
      dd: 'dd',
    },
    cc: [{ dd: 'dd' }],
  }
  const res = merge({ schema, newData })
  expect(res).toEqual({
    isPro: false,
    darkMode: false,
    pages: {
      home: false,
      settings: false,
      test: {
        home: true,
        cc: {
          dd: 'TEStBBBB',
          ff: '000',
        },
      },
    },
  },
  )
})

test('object in array', () => {
  const schema = {
    pages: {
      dd1: [
        {
          dd: 'TESt Hee 11',
        },
      ],
    },
  }

  const newData = {
    pages: {
      dd1: [
        {
          dd: 'TESt Hee 11',
          vv: 'TESt Hee 11',
        },
      ],
    },
  }
  const res = merge({ schema, newData })
  expect(res).toEqual({
    pages: {
      dd1: [
        {
          dd: 'TESt Hee 11',
        },
        {
          dd: 'TESt Hee 11',
          vv: 'TESt Hee 11',
        },
      ],
    },
  },
  )
})

test('object in array in array', () => {
  const schema = {
    pages: {
      dd1: [
        {
          tt: [
            {
              theme: 'aaa',
            },
          ],
        },
      ],
    },
  }

  const newData = {
    pages: {
      dd1: [
        {
          tt: [{
            theme: 'bbbb',
            xxx: 'xxx',
          }],
        },
      ],
    },
  }
  const res = merge({ schema, newData })
  expect(res).toEqual({
    pages: {
      dd1: [
        {
          tt: [
            {
              theme: 'aaa',
            },
          ],
        },
        {
          tt: [
            {
              theme: 'bbbb',
              xxx: 'xxx',
            },
          ],
        },
      ],
    },
  },
  )
})
