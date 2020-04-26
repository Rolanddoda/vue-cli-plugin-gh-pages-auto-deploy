const plugin = require('./plugin')

module.exports = async (api, opts) => {
  plugin.extendPackage(api)
  plugin.addFiles(api, opts)

  api.onCreateComplete(() => {
    plugin.addUserNameAndEmail(api)
    plugin.createOrUpdateVueConfig(api)
    api.exitLog(`Enjoy automatic deploy to github pages! 😉`)
  })
}
