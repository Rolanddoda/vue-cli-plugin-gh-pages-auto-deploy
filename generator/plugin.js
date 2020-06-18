const fs = require('fs')
const execa = require('execa')
const helpers = require('./helpers')

async function addFiles(api) {
  const cleanInstallCommand = helpers.getCleanInstallCommand(api)
  const { username, email } = await helpers.getUserCredentials()

  api.render('./templates', {
    username,
    email,
    cleanInstallCommand,
  })
}

function extendPackage(api) {
  api.extendPackage({
    scripts: {
      'gh-pages-deploy': 'node scripts/gh-pages-deploy.js',
    },
    devDependencies: {
      chalk: '^4.0.0',
      execa: '^4.0.0',
      'node-emoji': '^1.10.0',
    },
  })
}

async function createOrUpdateVueConfig(api, repoName) {
  const config = api.resolve('vue.config.js')

  if (!fs.existsSync(config)) await helpers.createVueConfig(config, repoName)
  else {
    const file = require(config)
    if (!file.publicPath) await helpers.updateVueConfig(config, repoName)
  }
}

async function lintCode(api) {
  if (api.generator.hasPlugin('@vue/cli-plugin-eslint')) {
    await execa.command('vue-cli-service lint')
  }
}

module.exports = {
  addFiles,
  extendPackage,
  createOrUpdateVueConfig,
  lintCode,
}
