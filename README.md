# angular-debounce

> Tiny debouncing function for Angular.JS

[![Build Status](https://travis-ci.org/rubenv/angular-debounce.png?branch=master)](https://travis-ci.org/rubenv/angular-debounce)

Debouncing is a form of rate-limiting: it prevents rapid-firing of events. You
can use this to throttle calls to an autocomplete API: call a function multiple
times and it won't get called more than once during the time interval you
specify.

## Usage
Add angular-debounce to your project:

```
bower install --save angular-debounce
```

Add it to your HTML file:

```html
<script src="bower_components/angular-debounce/dist/angular-debounce.min.js"></script>
```

Reference it as a dependency for your app module:

```js
angular.module('myApp', ['rt.debounce']);
```

Use it:

```js
angular.module('myApp').controller('testCtrl', function (debounce) {
    // Inject through "debounce".
    
    // Creates a function that will only get called once every 2 seconds:
    var fn = debounce(2000, function () {
        // Do things here.
    });
    
    // Call it a couple of times, will only invoke the wrapped function
    // 2 seconds after the last invocation:
    fn();
    fn();
    fn();
    
    // Want to stop waiting and send out the call immediately? Flush it!
    fn.flush();

    // Want to stop waiting and send out the call immedialtely if any was made? Flush pending calls!
    fn.flushPending();

    // No longer care about it? Cancel is supported.
    fn.cancel();
});
```

## License 

    (The MIT License)

    Copyright (C) 2014 by Ruben Vermeersch <ruben@rocketeer.be>

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
