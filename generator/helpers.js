const execa = require('execa')
const fs = require('fs')

async function getUserCredentials() {
  const { stdout: userName } = await execa.command('git config user.name')
  const { stdout: email } = await execa.command('git config user.email')
  return {
    username: userName.replace(' ', ''),
    email,
  }
}

function getPackageManager(api) {
  if (fs.existsSync(api.resolve('package-lock.json'))) {
    return 'npm'
  }
  if (fs.existsSync(api.resolve('yarn.lock'))) {
    return 'yarn'
  }
}

function getCleanInstallCommand(api) {
  const npmOrYarn = getPackageManager(api)
  return npmOrYarn === 'npm' ? 'npm ci' : 'yarn install --frozen-lockfile'
}

async function createVueConfig(configPath, repoName) {
  const template = `module.exports = {\n publicPath: process.env.NODE_ENV === "production" ? "/${repoName}/" : "/" \n }`
  fs.writeFileSync(configPath, template, { encoding: 'utf-8' })
}

async function updateVueConfig(configPath, repoName) {
  const { EOL } = require('os')
  const fileLines = fs.readFileSync(configPath, 'utf-8').split(/\r?\n/g)
  const newLine = `publicPath: process.env.NODE_ENV === "production" ? "/${repoName}/" : "/",`

  fileLines.splice(1, 0, newLine)
  fs.writeFileSync(configPath, fileLines.join(EOL), { encoding: 'utf-8' })
}

module.exports = { getUserCredentials, createVueConfig, updateVueConfig, getCleanInstallCommand }
