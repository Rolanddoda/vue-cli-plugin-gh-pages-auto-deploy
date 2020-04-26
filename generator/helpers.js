const execa = require("execa")
const fs = require('fs')

async function getUserCredentials() {
  const {stdout: userName} = await execa.command('git config user.name')
  const {stdout: email} = await execa.command('git config user.email')
  return {
    username: userName.replace(' ', ''),
    email
  }
}

async function getRepoName() {
  const {stdout: repoUrl} = await execa.command('git config --get remote.origin.url')
  const {stdout: repoName} = await execa.command(`basename -s .git ${repoUrl}`)
  return repoName
}

async function createVueConfig(configPath) {
  const repoName = await getRepoName()
  const template = `module.exports = {\n publicPath: process.env.NODE_ENV === "production" ? "/${repoName}/" : "/" \n }`
  fs.writeFileSync(configPath, template, {encoding: 'utf-8'})
}

async function updateVueConfig (configPath) {
  const repoName = await getRepoName()
  const {EOL} = require('os')
  const fileLines = fs.readFileSync(configPath, 'utf-8').split(/\r?\n/g)
  const newLine = `publicPath: process.env.NODE_ENV === "production" ? "/${repoName}/" : "/",`

  fileLines.splice(1, 0, newLine)
  fs.writeFileSync(configPath, fileLines.join(EOL), {encoding: 'utf-8'})
}

module.exports = {getUserCredentials, createVueConfig, updateVueConfig}
