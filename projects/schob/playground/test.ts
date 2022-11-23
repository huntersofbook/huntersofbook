import {merge} from '@huntersofbook/schob'

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
console.log(res)