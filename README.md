# Gulp Boilerplate

> A set of reusable Gulp tasks for Front End development.

This repo serves a few purposes:

* Provide a collection of gulp tasks that can be reused across any project.
* A repo that can be cloned and used a sandbox to learn front end tooling.
* CSS tasks that are governed by a linter that conform to agreed standards, with associated documentation. JavaScript will be added soon.

You'll need to be comfortable using the command line work with this.

This doesn't yet include a UI of any kind. See the 'Issues' tab for planned enhancements to this repo that will make it a little more friendly.


## Dependencies

Node, Yarn and Gulp are required on your system in order to install project level dependancies and run the project. If you're not familiar with any of these please refer to their documentation.

* [Node](https://nodejs.org/en/).
* [Yarn](https://yarnpkg.com/).
* [Gulp](http://gulpjs.com/) globally: `$ npm i -g gulp`.


## Set up

After cloning, from the command line go to the project root and install the project-level dependancies: `$ yarn`.

> **Note:** We are using [Yarn](https://yarnpkg.com/) rather than NPM (which is included when installing Node) to manage our packages. They serve exactly the same purpose. Yarn interacts with the [NPM registry](https://www.npmjs.com/) with some extra enhancements.

### File paths

Source and destination file paths for each file type handled by these tasks need to be defined in `package.json`. The current values work for this repo but may need to be changed for your particular project.

## Gulp tasks

### Generic Tasks

`$ gulp` runs all the tasks that fill a specific purpose. This is the default task, the same as `$ gulp default`.

`$ gulp watch` runs all tasks tasks attached to the `$ gulp` command, then monitors defined files/folders for changes and runs appropriate tasks automatically. For example, CSS will be rebuilt as soon as a SASS file is changed.

### Specific Tasks

`$ gulp clean` deletes all files and folders that are built by the task runner. This is the first step of the default task.

`$ gulp sasslint` checks all SASS files to ensure they pass the linting rules defined in `.sass-lint.yml` and as outlined in the CSS Standards document.

`$ gulp css` first runs the `sasslint` task. If that task finds errors in the SASS source it displays the errors in the console and stops. If there are no errors the SASS source files are built to CSS with vendor prefixes added automatically where appropriate and a sourcemaps generated. The sasslint config includes some rules that will not prevent the build but will show a warning; these are displayed the terminal.
