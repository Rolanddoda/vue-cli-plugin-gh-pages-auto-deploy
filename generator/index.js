const plugin = require('./plugin')

module.exports = async (api) => {
  plugin.extendPackage(api)
  await plugin.addFiles(api)

  api.afterInvoke(async () => {
    await plugin.createOrUpdateVueConfig(api)
    await plugin.lintCode(api)
    api.exitLog(`
      ☺☺ Enjoy automatic deployment ☺☺
      🌟🌟 Please don't forget to star the project on Github if you like this plugin. 🌟🌟
      Project URL: https://github.com/Rolanddoda/vue-cli-plugin-gh-pages-auto-deploy
    `)
  })
}
