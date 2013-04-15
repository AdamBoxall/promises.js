
function Promise(callback) {

    this.promise = callback(this.resolve.bind(this));
}

Promise.prototype = {

    resolve: function() {
        if (this.notify) {
            this.notify(this.promise);
        }
    },

    subscribe: function(notify) {
        this.notify = notify;
        return this;
    }
}

function when(resolvers) {

    var promises = [];
    var resolved = [];

    resolvers.forEach(function(resolver) {
        promises.push((new Promise(resolver)).subscribe(resolve));
    });

    function resolve() {
        var index = this.promises.indexOf(promise);
        if (index !== -1) {
            resolved.push(promises.splice(index, 1));
            if (promises.length === 0) {
                doneCallback();
            }
        }
    }

    var doneCallback;

    return {
        done: function(callback) {
            doneCallback = callback;
        }
    }
}