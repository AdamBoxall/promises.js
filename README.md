# JavaScript Promises

## A minimalist JavaScript promise framework

### What's that?

When dealing with a lot of asynchronous JavaScript you can quite often find yourself in the position where you need to ensure multiple asynchronous code forks have been completed before continuing. This is where 'promises' come in handy, as you can define a block of code to run once all of your promises have marked themselves as 'resolved'.

There are already alternatives out there, namely jQuery's Deferred object, however defining your own promises is a bit clunky I've found from recent experience. This API is meant to be as simple and intuitive as possible, and in the not too distant future compatible with jQuery as well.

### Usage

First, download promises.js and include it into your document:

    <script src="/path/to/js/promises.min.js"></script>

promises.js exposes only one global function `when()`, to avoid name collisions as much as possible. You can either pass a single callable function or an array of them, and in return you will be passed back a simple object containing a `done()` method:

    // An array of functions
    when([funcOne, funcTwo]).done(...);

    // A single function
    when(funcSingle).done(...);

The functions above will all be passed a `resolve()` function to mark the fork as resolved when invoked:

    // Wait a second then mark the promise as resolved
    function funcSingle(resolve) {
        setTimeout(function() {
            resolve();
        }, 1000)
    }

Once all the functions passed to `when()` have been resolved, the callback passed to `done()` is then invoked:

    when([funcOne, funcTwo]).done(function() {
        // Once this is called you know all promises have been resolved
    });

And that's it! There's a working example in `/index.html` of this repository if you want to see everything in action.