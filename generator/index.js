import plugin from './helpers'

module.exports = (api, opts) => {
  plugin.addFiles(api, opts)
  
  api.onCreateComplete(() => {
    api.exitLog('Enjoy automatic deploy to github pages! 😉')
  })
}