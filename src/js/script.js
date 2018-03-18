import polyFills from './modules/_check-polyfills';
import logStuff from './modules/_example';

// import amd invoke the things.
function invoke() {
  logStuff();
}

polyFills(invoke);
