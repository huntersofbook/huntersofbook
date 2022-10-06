import { defineStore } from 'pinia'
import { Ref, ref } from 'vue'

interface CounterState {
  n: number
  myRef: Ref<string>
}

export const useCounter = defineStore('counter', {
  state: (): CounterState => ({
    n: 5,
    myRef: ref('hello'),
  }),
  actions: {
    increment() {
      this.n++
    },
  },
})
