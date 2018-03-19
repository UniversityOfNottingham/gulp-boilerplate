// Check if the browser supports some new features we use.
// Add tests here as we add new Polyfills.
function _supportsFeatures() {
  return NodeList.prototype.forEach && window.fetch;
}

// Append polyfills if need be.
function polyFills(callback) {
  if (!_supportsFeatures()) {
    const polyfills = document.createElement('script');
    polyfills.src = './js/polyfill.js';
    document.head.appendChild(polyfills);
    polyfills.onload = () => {
      callback();
    };
  } else {
    callback();
  }
}

export default polyFills;
