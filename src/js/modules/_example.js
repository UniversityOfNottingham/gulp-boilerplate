// Functions that are not to be exported are prefixed with an underscore.
function _arrayLogger(arr = ['x', 'y', 'z']) {
  arr.forEach(item => console.log(`${item} is a letter.`));
}

// An exported function that does some ES6 stuff.
function logStuff() {
  const letters = [['a', 'b', 'c']];
  const someValue = 53;

  console.log(`${someValue} is a number.`);
  _arrayLogger(...letters);
  _arrayLogger();
}

// Export the function. Anything that imports this file can use it.
export default logStuff;
