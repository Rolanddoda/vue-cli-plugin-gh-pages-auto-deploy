function addFiles(api, opts) {
  const files: {
    '.github/workflows/gh-pages-deploy.yml': './templates/.github/workflows/gh-pages-deploy.yml',
    'scripts/gh-pages-deploy.js': './templates/scripts/gh-pages-deploy.js'
  }
  
  api.render(files, opts)
}

export default { addFiles }