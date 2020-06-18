const path = require('path')
const plugin = require('./plugin')

async function getRepoName() {
  try {
    const { stdout: repoUrl } = await execa.command('git config --get remote.origin.url')
    return path.basename(repoUrl).replace('.git', '')
  } catch (e) {
    console.error(
      "'You must add a remote before installing this plugin. Adding a remote: https://help.github.com/en/github/using-git/adding-a-remote'"
    )
    process.exit(1)
  }
}

module.exports = async (api) => {
  const repoName = await getRepoName()
  plugin.extendPackage(api)
  await plugin.addFiles(api)

  api.afterInvoke(async () => {
    await plugin.createOrUpdateVueConfig(api, repoName)
    await plugin.lintCode(api)
    api.exitLog(`
      ☺☺ Enjoy automatic deployment ☺☺
      🌟🌟 Please don't forget to star the project on Github if you like this plugin. 🌟🌟
      Project URL: https://github.com/Rolanddoda/vue-cli-plugin-gh-pages-auto-deploy
    `)
  })
}
