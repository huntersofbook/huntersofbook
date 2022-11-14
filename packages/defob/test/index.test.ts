import { expect, test } from 'vitest'

import { merge } from '../src/index'

test('small object', () => {
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
      ],
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
          cc: false,
          tt: {
            dd: 'TESt Hee 11',
          },
        },
        {
          dd: '999',
          tt: [{
            theme: 'xxx',
          }],
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
          cc: true,
          tt: {
            dd: 'bbb',
          },
        },
        {
          dd: '1999',
          tt: [{
            theme: 'bbbb',
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
          dd: 'TESt Hee 11',
          cc: true,
          tt: {
            dd: 'bbb',
          },
        },
        {
          dd: '1999',
          tt: [{
            theme: 'bbbb',
          }],
        },
      ],
    },
  },
  )
})

test('object in array', () => {
  const schema = {
    pages: {
      dd1: [
        {
          tt: [{
            theme: 'bbbb',
          }],
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
          tt: [{
            theme: 'bbbb',
          }],
        },
      ],
    },
  },
  )
})
