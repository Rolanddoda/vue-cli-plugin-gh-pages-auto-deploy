const plugin = require('./plugin')

module.exports = (api, opts) => {
  plugin.extendPackage(api)
  plugin.addFiles(api, opts)

  api.onCreateComplete(async () => {
    await plugin.addUserNameAndEmail(api)
    await plugin.createOrUpdateVueConfig(api)
    await plugin.lintCode(api)
    api.exitLog(`
      ☺☺ Enjoy automatic deployment ☺☺
      🌟🌟 Please don't forget to star the project on Github if you like this plugin. 🌟🌟
      Project URL: https://github.com/Rolanddoda/vue-cli-plugin-gh-pages-auto-deploy
    `)
  })
}
