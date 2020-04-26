const helpers = require('./helpers')
const fs = require('fs')

function addFiles(api, opts) {
  const files = {
    '.github/workflows/gh-pages-deploy.yml': './templates/.github/workflows/gh-pages-deploy.yml',
    'scripts/gh-pages-deploy.js': './templates/scripts/gh-pages-deploy.js'
  }

  api.render(files, opts)
}

async function addUserNameAndEmail(api) {
  const filePath = api.resolve('.github/workflows/gh-pages-deploy.yml')
  const file = fs.readFileSync(filePath, 'utf8')
  const {username, email} = helpers.getUserCredentials()
  const updatedFile = file.replace('[[username]]', username).replace('[[email]]', email)
  fs.writeFileSync(filePath, updatedFile, {encoding: 'utf8'})
}

function extendPackage(api) {
  api.extendPackage({
    scripts: {
      "gh-pages-deploy": "node scripts/gh-pages-deploy.js"
    },
    "devDependencies": {
      "chalk": "^4.0.0",
      "execa": "^4.0.0",
      "node-emoji": "^1.10.0"
    }
  })
}

async function createOrUpdateVueConfig(api) {
  const config = api.resolve('vue.config.js')

  if (!fs.existsSync(config)) {
    const repoName = await helpers.getRepoName()
    const template = `module.exports = {\npublicPath: process.env.NODE_ENV === "production" ? "/${repoName}/" : "/"\n}`
    fs.writeFileSync(config, template, {encoding: 'utf-8'})
  } else {
    const file = require(config)
    if (!file.publicPath) {
      const repoName = await helpers.getRepoName()
      const {EOL} = require('os')
      const fileLines = fs.readFileSync(config, 'utf-8').split(/\r?\n/g)
      const newLine = `publicPath: process.env.NODE_ENV === "production" ? "/${repoName}/" : "/",`
      fileLines.splice(1, 0, newLine)
      fs.writeFileSync(config, fileLines.join(EOL), {encoding: 'utf-8'})
    }
  }
}
module.exports = {
  addFiles,
  addUserNameAndEmail,
  extendPackage,
  createOrUpdateVueConfig
}
