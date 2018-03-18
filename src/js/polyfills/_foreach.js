// Add support for forEach on Nodelists, IE11.
function forEachPolyfill() {
  if (!NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function(callback, thisArg) {
      thisArg = thisArg || window;
      for (let i = 0; i < this.length; i++) {
        callback.call(thisArg, this[i], i, this);
      }
    };
  }
}

export default forEachPolyfill;
