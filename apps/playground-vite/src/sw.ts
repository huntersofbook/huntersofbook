/// <reference lib="webworker" />

import { initializeApp } from 'firebase/app'
import { getMessaging, onBackgroundMessage } from 'firebase/messaging/sw'

const firebaseConfig = {
  apiKey: 'AIzaSyDQLM2AfL5FpM3AhsUGHhUlpXX1HZ6dxc8',
  authDomain: 'test-27a9c.firebaseapp.com',
  projectId: 'test-27a9c',
  storageBucket: 'test-27a9c.appspot.com',
  messagingSenderId: '28472926471',
  appId: '1:28472926471:web:0507bf7e66657e80a725a2',
}
declare const self: ServiceWorkerGlobalScope

function initServiceWorker() {
  const app = initializeApp(firebaseConfig)
  const messaging = getMessaging(app)
  onBackgroundMessage(messaging, async () => {
    console.log('Sent notification')
  })
}

initServiceWorker()

// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ignored = self.__WB_MANIFEST
