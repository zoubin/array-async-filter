# array-async-filter
Async filter function for arrays.

Supports async callbacks, as well as sync ones.
Callbacks returning a promise work, too.

## Example

```javascript
var asyncFilter = require('array-async-filter');
asyncFilter(
  [1, 2, 3, 4],
  // call the fourth argument when it finishes
  function (val, i, arr, next) {
    process.nextTick(function () {
      next(val % 2);
    });
  },
  function (res) {
    // `res` === [1, 3]
  }
);

asyncFilter(
  [1, 2, 3, 4],
  // return a promise also works
  function (val) {
    return new Promise(function (rs) {
      setTimeout(function() {
        rs(val % 2);
      }, 10);
    });
  },
  function (res) {
    // `res` === [1, 3]
  }
);

asyncFilter(
  [1, 2, 3, 4],
  // do not specify the fourth argument
  function (val, index, arr) {
    return val % 2;
  },
  function (res) {
    // `res` === [1, 3]
  }
);

```

## asyncFilter(arr, fn, done)

Returns a new array containing elements filtered from `arr`.

### arr

Type: `Array`

### fn(val, index, arr, next)

Called with each element in `arr`.

Type: `Function`

If `fn` is async, it should call `next(keep)` when it finishes.
`val` will be added to the final result when `keep` is truthy.

If a promise is returned from `fn(val, index, arr, next)`,
then `val` will be added to the final result when the resolved value is truthy.

If `fn` is sync, do not specify the fourth argument in the definition of `fn`.
`val` will be added to the final result when `fn(val, index, arr)` returns a truthy value.

