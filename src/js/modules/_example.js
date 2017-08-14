// Require other modules
// const someModule = require('./_some-module'),


// Require from node_modules (npm) directly via the package name
// const $ = require('jQuery');
// $('.some-element').addClass('foo');


// This is a private function, prefixed with an underscore.
// This shouldn't be exported, only used within this module by other functions.
function _consoleLogger(arr = ['e', 'f', 'g', 'h']) {
  arr.forEach(item => console.log(`The letter is ${item}.`));
}


function greeting() {
  const letters = [['a', 'b', 'c', 'd']];
  const someValue = 53;

  console.log(`The value is ${someValue}.`);
  _consoleLogger(...letters);
  _consoleLogger();
}


// Export the functions you want to make avaiable to any JS file that requires this one.
module.exports = {
  greeting: greeting
}
