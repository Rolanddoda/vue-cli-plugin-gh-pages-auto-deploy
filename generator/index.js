const plugin = require('./plugin')

module.exports = (api, opts) => {
  plugin.extendPackage(api)
  plugin.addFiles(api, opts)

  api.onCreateComplete(async () => {
    await plugin.addUserNameAndEmail(api)
    await plugin.createOrUpdateVueConfig(api)
    await plugin.lintCode(api)
    api.exitLog(`Enjoy automatic deploy to github pages! 😉`)
  })
}
