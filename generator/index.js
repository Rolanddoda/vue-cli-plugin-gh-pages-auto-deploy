const plugin = require('./helpers')

module.exports = async(api, opts) => {
  plugin.extendPackage(api)
  plugin.addFiles(api, opts)

  api.onCreateComplete(() => {
    plugin.addUserNameAndEmail(api)
    api.exitLog(`Enjoy automatic deploy to github pages! 😉`)
  })
}
