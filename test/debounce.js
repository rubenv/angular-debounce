describe('Debounce', function () {
    var $timeout = null;
    var debounce = null;
    var calls = 0;
    var fn = null;

    beforeEach(function () {
        return module('rt.debounce');
    });

    beforeEach(inject(function (_debounce_, _$timeout_) {
        $timeout = _$timeout_;
        debounce = _debounce_;
        calls = 0;
        fn = debounce(100, function () {
            calls += 1;
            return calls;
        });
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

    it('Flushes pending calls', function () {
        fn();
        fn.flush();
        assert.equal(calls, 1);
    });

    it('Returns the result of a flushed call', function () {
        fn();
        var result = fn.flush();
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

    it('Returns result of a flush even if never called', function () {
        var result = fn.flush();
        assert.equal(result, 1);
        assert.equal(calls, 1);
    });
    
    it('Does not execute the callback if cancel is called on the wrapper', function () {
        assert.equal(calls, 0);
        fn();
        fn.cancel();
        $timeout.flush(100);
        assert.equal(calls, 0);
    });
    
    it('Does not execute the callback if no calls were made when calling flushPending', function () {
        assert.equal(calls, 0);
        fn.flushPending();
        assert.equal(calls, 0);
    });
    
    it('Flushes pending calls when calling flushPending', function () {
        assert.equal(calls, 0);
        fn();
        fn.flushPending();
        assert.equal(calls, 1);
    });

    it('Returns the result of a flushPending call', function () {
        fn();
        var result = fn.flushPending();
        assert.equal(result, 1);
    });
});
