describe('Debounce', function () {
    var $timeout = null;
    var debounce = null;
    var calls = 0;
    var throttleCalls = 0;
    var fn = null;
    var throttleFn = null;

    beforeEach(function () {
        return module('rt.debounce');
    });

    beforeEach(inject(function (_debounce_, _$timeout_) {
        $timeout = _$timeout_;
        debounce = _debounce_;
        calls = 0;
        throttleCalls = 0;
        fn = debounce(100, function () {
            calls += 1;
            return calls;
        });

        throttleFn = debounce(100, function () {
            throttleCalls += 1;
            return throttleCalls;
        }, { throttle: true });
    }));

    afterEach(function () {
        $timeout.verifyNoPendingTasks();
    });

    it('Can debounce', function () {
        assert.equal(calls, 0);
        fn();
        assert.equal(calls, 0);
        $timeout.flush(100);
        assert.equal(calls, 1);
    });

    it('Can throttle', function () {
        assert.equal(throttleCalls, 0);
        throttleFn();
        assert.equal(throttleCalls, 0);
        $timeout.flush(100);
        assert.equal(throttleCalls, 1);
        throttleFn();
        $timeout.flush(50);
        throttleFn();
        $timeout.flush(51);
        assert.equal(throttleCalls, 2);
        $timeout.flush(100);
        assert.equal(throttleCalls, 2);
    });

    it('Will requeue calls', function () {
        fn();
        $timeout.flush(50);
        assert.equal(calls, 0);
        fn();
        assert.equal(calls, 0);
        $timeout.flush(50);
        assert.equal(calls, 0);
        $timeout.flush(50);
        assert.equal(calls, 1);
    });

    it('Resets after execute', function () {
        fn();
        $timeout.flush(100);
        fn();
        $timeout.flush(100);
        assert.equal(calls, 2);
    });
    
    it('Resets throttle after execute', function () {
        throttleFn();
        $timeout.flush(100);
        throttleFn();
        $timeout.flush(100);
        assert.equal(throttleCalls, 2);
    });

    it('Flushes pending calls', function () {
        fn();
        fn.flush();
        assert.equal(calls, 1);
    });
    
    it('Flushes pending throttle calls', function () {
        throttleFn();
        throttleFn.flush();
        assert.equal(throttleCalls, 1);
    });

    it('Returns the result of a flushed call', function () {
        fn();
        var result = fn.flush();
        assert.equal(result, 1);
    });
    
    it('Returns the result of a flushed throttled call', function () {
        throttleFn();
        var result = throttleFn.flush();
        assert.equal(result, 1);
    });

    it('Does not execute again in flush unless needed', function () {
        fn();
        $timeout.flush(100);
        assert.equal(calls, 1);
        var result = fn.flush();
        assert.equal(result, 1);
        assert.equal(calls, 1);
    });
    
    it('Does not execute again in throttle flush unless needed', function () {
        throttleFn();
        $timeout.flush(100);
        assert.equal(throttleCalls, 1);
        var result = throttleFn.flush();
        assert.equal(result, 1);
        assert.equal(throttleCalls, 1);
    });

    it('Returns result of a flush even if never called', function () {
        var result = fn.flush();
        assert.equal(result, 1);
        assert.equal(calls, 1);
    });
    
    it('Returns result of a flush even if never called', function () {
        var result = throttleFn.flush();
        assert.equal(result, 1);
        assert.equal(throttleCalls, 1);
    });
    
    it('Does not execute the callback if cancel is called on the wrapper', function () {
        assert.equal(calls, 0);
        fn();
        fn.cancel();
        $timeout.flush(100);
        assert.equal(calls, 0);
    });
    
    it('Does not execute the callback if cancel is called on the throttle wrapper', function () {
        assert.equal(throttleCalls, 0);
        throttleFn();
        throttleFn.cancel();
        $timeout.flush(100);
        assert.equal(throttleCalls, 0);
    });
    
    it('Does not execute the callback if no calls were made when calling flushPending', function () {
        assert.equal(calls, 0);
        fn.flushPending();
        assert.equal(calls, 0);
    });
    
    it('Does not execute the callback if no calls were made when calling flushPending with throttle option', function () {
        assert.equal(throttleCalls, 0);
        throttleFn.flushPending();
        assert.equal(throttleCalls, 0);
    });
    
    it('Flushes pending calls when calling flushPending', function () {
        assert.equal(calls, 0);
        fn();
        fn.flushPending();
        assert.equal(calls, 1);
    });
    
    it('Flushes pending calls when calling flushPending with throttle option', function () {
        assert.equal(throttleCalls, 0);
        throttleFn();
        throttleFn.flushPending();
        assert.equal(throttleCalls, 1);
    });

    it('Returns the result of a flushPending call', function () {
        fn();
        var result = fn.flushPending();
        assert.equal(result, 1);
    });
    
    it('Returns the result of a flushPending call with throttle option', function () {
        throttleFn();
        var result = throttleFn.flushPending();
        assert.equal(result, 1);
    });
});
