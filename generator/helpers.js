const execa = require("execa")

async function getUserCredentials() {
  const {stdout: userName} = await execa("git", ["config", "user.name"])
  const {stdout: email} = await execa("git", ["config", "user.email"])
  return {
    username: userName.replace(' ', ''),
    email
  }
}

async function getRepoName() {
  const {stdout: repoUrl} = await execa('git', ['config', '--get', 'remote.origin.url'])
  const {stdout: repoName} = await execa('basename', ['-s', '.git', repoUrl])
  return repoName
}

module.exports = { getUserCredentials, getRepoName }
