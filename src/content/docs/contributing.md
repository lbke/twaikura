# Contributing

## Dev environment

### Get the right Node version

The `.nvmrc` contains the Node version we use in VNS. Usually, higher up versions will also work, but may introduce unexpected breaking changes.

We recommend to install Node using [NVM for Linux/Mac](https://github.com/nvm-sh/nvm) or [NVM for Windows](https://github.com/coreybutler/nvm-windows), especially if you need to maintain multiple projects.

### Linking Vulcan NPM from a local install

Follow Vulcan NPM contribute doc to setup Lerna

Run the link script:

```sh
./scripts/link-vulcan.sh
```

This will link the Lerna NPM package so they are used instead of NPM hosted packages, and will also prevent
duplications of some libraries, such as React.

## Branches

We follow the Git Flow model.

- `master`: is the current live version.
- `bugfix/*`: Bugfixes branches should start from master.
- `devel`: Devel is the next version.
- `feature/*`: features branches should start from master.
- `support/*x.x.x*`: is for bugfixes for a specific version.
- Tags allow to easily find the commit corresponding to a deployed versions.

## Vulcan NPM local installation

If you want to use the bleeding edge version of Vulcan, you'll need to install the Vulcan NPM packages locally.
Vulcan NPM is relying on Lerna

### Troubleshoot

#### Issues with hooks due to multiple version of React

This is an open issue with Yarn workspaces, it is difficult not to duplicate packages used both by your NPM packages and your local app.
Easiest solution is to force Vulcan Next to use the packages from Vulcan NPM. See relevant scripts in both Vulcan NPM (to activate the link)
and Vulcan Next (to use linked versions).

## Deployment of Vulcan Next demo on Vercel

Vercel only provide a free-tier for personnal accounts. Therefore, `https://vulcan-next.vercel.app` is based on [eric-burel/vulcan-next fork](https://github.com/eric-burel/vulcan-next) instead of the main repo [VulcanJS/vulcan-next](https://github.com/VulcanJS/vulcan-next).

[wei/pull](https://github.com/wei/pull) bot is used to automatically synchronize this fork with the main Vulcan Next repository. The application will be deployed automatically when Vulcan Next master branch is updated, but expect some latency because of this fork setup.
