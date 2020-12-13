# :electric_plug: vue-cli-plugin-gh-pages-auto-deploy

-------

## :rocket: Getting Started

If yon don't have a project created with Vue CLI:

```sh
vue create vue-your-plugin
```

Install the plugin into your project:

```sh
cd vue-your-plugin
vue add gh-pages-auto-deploy
```

## What this plugin does ?

This plugin automates [Github Pages](https://help.github.com/en/github/working-with-github-pages/about-github-pages)
deployment by using [Github Actions](https://help.github.com/en/actions/getting-started-with-github-actions/about-github-actions).

## How ?
On every push or merge to the `master` branch, your code will be built and pushed
to a branch named `gh-pages`.
So, practically your code will automatically be deployed every time you push on `master`.

## How to make it work ?
- After you have added the plugin, just commit and push to `master`.

- Navigate to your github project and click 'Settings'
  ![](https://dev-to-uploads.s3.amazonaws.com/i/iup3jxzgr8f7v1gmjx33.png)
- Scroll to find the section 'Github Pages' , select the `gh-pages` branch and click 'Save'
  ![](https://dev-to-uploads.s3.amazonaws.com/i/ttynt8nge4ajxb29txpn.png)
- Click *Actions* (1) then *Deploy to github pages* (2) and last click on the action (3).
  ![](https://dev-to-uploads.s3.amazonaws.com/i/hrgn3ww1w75uxxdfuzen.png)
- If everything goes well, you will see something like this:
  ![](https://dev-to-uploads.s3.amazonaws.com/i/2nshvsc10qivoif44d7f.png)

### 🚀🚀 Congrats 🚀🚀

Your site is ready to be published.
You might have to wait a bit. Generally it takes 2–10 minutes until this process is done.
