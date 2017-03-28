# Gulp Boilerplate

> A set of reusable Gulp tasks for Front End development.

This repo serves a few purposes:

* Provide a collection of gulp tasks that can be reused across any project.
* A repo that can be cloned and used a sandbox to learn front end tooling.
* CSS and JavaScript tasks that are governed by linters that configured to agreed standards.

You'll need to be comfortable using the command line work with this.

As is, this only has tasks for building CSS from SASS (as well as linting and minfying) and doesn't include a UI at all. See the 'Issues' tab for planned enchancements to this repo.


## Dependencies

Node, Yarn and Gulp are required on your system in order to install project level dependancies and run the project. If you're not familiar with any of these please refer to their documentation.

* [Node](https://nodejs.org/en/).
* [Yarn](https://yarnpkg.com/).
* [Gulp](http://gulpjs.com/) globally: `$ npm i -g gulp`.


## Set up

After cloning, from the command line go to the project root and install the project-level depancies: `$ yarn`

> **Note:** We are using [Yarn](https://yarnpkg.com/) rather than NPM (which is included when installing Node) to manage our packages. They serve exactly the same purpose. Yarn interacts with the [NPM registry](https://www.npmjs.com/) with some extra enhancements.

## Gulp tasks

`$ gulp` runs all the build tasks:

* Lint SASS source files against the config defined in `.sass-lint.yml`.
* Build SASS into CSS, adding vendor prefixes where appropriate.
* Add sourcemaps, which will reveal in the browsers developer tools which SASS partial a particular line of CSS came from.
* Minify the built CSS (strip all comments, remove all white space from the file).

`$ gulp watch` runs all tasks tasks attached to the `$ gulp` command, then monitors defined files/folders for changes and runs appropriate tasks automatically. For example, CSS will be rebuilt as soon as a SASS file is changed.

`$ gulp clean` deletes all files and folders that are built by the task runner.
