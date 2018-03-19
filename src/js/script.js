// Import our stuff.
import polyFills from './modules/_check-polyfills';
import logStuff from './modules/_example';

// Invoke the things.
function invoke() {
  logStuff();
}

// Call a function to check if we need polyfills.
// Add the function that invokes the things as an arg.
polyFills(invoke);
