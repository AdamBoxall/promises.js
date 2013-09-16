/**
 * promises.js
 * (c) 2013 Adam Boxall, http://adamboxall.com
 * https://github.com/AdamBoxall/promises.js
 * license MIT
 */
(function(root, factory) {

    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else {
        root.when = factory();
    }

})(this, function() {

    return function(resolvers) {

        var promises = [];
        var resolved = [];
        var complete;

        function Promise(resolver) {
            resolver(this.resolve.bind(this));
        }

        Promise.prototype = {
            resolve: function() {
                if (this.notify) {
                    this.notify(this);
                }
            },
            subscribe: function(notify) {
                this.notify = notify;
                return this;
            }
        }

        function resolve(promise) {
            var index = promises.indexOf(promise);
            if (index !== -1) {
                resolved.push(promises.splice(index, 1)[0]);
                if (promises.length === 0) {
                    complete();
                }
            }
        }

        if (typeof(resolvers) === 'function') {
            resolvers = [resolvers];
        }

        resolvers.forEach(function(resolver) {
            promises.push((new Promise(resolver)).subscribe(resolve));
        });

        return {
            done: function(done) {
                complete = done;
            }
        };

    };

});