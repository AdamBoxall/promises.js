
function Promise(callback) {

    this.promise = callback(this.resolve.bind(this));
}

Promise.prototype = {

    resolve: function() {
        if (this.notifyCallback) {
            this.notifyCallback(this.promise);
        }
    },

    subscribe: function(callback) {
        this.notifyCallback = callback;
        return this;
    }
}

function when(resolvers) {

    var promises = [];
    var resolved = [];

    resolvers.forEach(function(resolver) {
        var promise = (new Promise(resolver)).subscribe(resolve);
    });

    function resolve() {
        if ()
    }

    return {
        done: function(doneCallback) {

        }
    }
}