(function(window, angular) {'use strict';

angular.module('rt.debounce', []).factory('debounce', [
  '$timeout',
  function ($timeout) {
    return function (wait, fn, no_postpone) {
      var args, context, result, timeout;
      var executed = true;
      // Execute the callback function
      function ping() {
        result = fn.apply(context || this, args || []);
        context = args = null;
        executed = true;
      }
      // Cancel the timeout (for rescheduling afterwards).
      function cancel() {
        if (timeout) {
          $timeout.cancel(timeout);
          timeout = null;
        }
      }
      // This is the actual result of the debounce call. It is a
      // wrapper function which you can invoke multiple times and
      // which will only be called once every "wait" milliseconds.
      function wrapper() {
        context = this;
        args = arguments;
        if (!no_postpone) {
          cancel();
          timeout = $timeout(ping, wait);
        } else if (executed) {
          executed = false;
          timeout = $timeout(ping, wait);
        }
      }
      // Forces the execution of pending calls
      function flushPending() {
        var pending = !!context;
        if (pending) {
          // Call pending, do it now.
          cancel();
          ping();
        }
        return pending;
      }
      // The wrapper also has a flush method, which you can use to
      // force the execution of the last scheduled call to happen
      // immediately (if any). It will also return the result of that
      // call. Note that for asynchronous operations, you'll need to
      // return a promise and wait for that one to resolve.
      wrapper.flush = function () {
        if (!flushPending() && !timeout) {
          // Never been called.
          ping();
        }
        return result;
      };
      // Flushes pending calls if any
      wrapper.flushPending = function () {
        flushPending();
        return result;
      };
      // Cancels the queued execution if any
      wrapper.cancel = cancel;
      return wrapper;
    };
  }
]);

})(window, window.angular);
