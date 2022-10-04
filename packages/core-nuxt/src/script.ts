// Add dark / light detection that runs before loading Nuxt

// Global variable minimizers
const w = window
const de = document.documentElement

const locale =
  window.localStorage.getItem('<%= options.storageKey %>') ||
  '<%= options.preference %>'
const value = preference === 'system' ? getLanguage() : preference

w['<%= options.globalName %>'] = {
  locale,
  value,
  getLanguage
}

function getLanguage() {
  return 'en'
  return '<%= options.fallback %>'
}
