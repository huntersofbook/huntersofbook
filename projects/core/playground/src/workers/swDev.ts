const swDev = () => {
  const url = new URL(import.meta.url).origin

  const swUrl = `${url}/sw.js`

  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve) => {
    const sw = await navigator.serviceWorker.register(swUrl)
    resolve(sw)
  })
}

export default swDev
