const fs = require('fs')
const execa = require("execa")

function addFiles(api, opts) {
  const files = {
    '.github/workflows/gh-pages-deploy.yml': './templates/.github/workflows/gh-pages-deploy.yml',
    'scripts/gh-pages-deploy.js': './templates/scripts/gh-pages-deploy.js'
  }

  api.render(files, opts)
}

async function addUserNameAndEmail (api) {
  const filePath = api.resolve('.github/workflows/gh-pages-deploy.yml')
  const file = fs.readFileSync(filePath, { encoding: 'utf8' })
  const { username, email } = getUserCredentials()
  const updatedFile = file.replace('[[username]]', username).replace('[[email]]', email)
  fs.writeFileSync(filePath, updatedFile, { encoding: 'utf8' })
}

async function getUserCredentials () {
  const {stdout: userName} = await execa("git", ["config", "user.name"])
  const {stdout: email} = await execa("git", ["config", "user.email"])
  return {
    username: userName.replace(' ', ''),
    email
  }
}

module.exports = { addFiles, addUserNameAndEmail }
