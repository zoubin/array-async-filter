# array-async-filter
Filter an array using async filter callback.

## Example

example/filter.js:

```javascript
var asyncFilter = require('..');

asyncFilter(
  ['abc', 'bcd', 'cde', 'def'],
  function (val, i, arr, next) {
    process.nextTick(function () {
      next(null, val.indexOf('cd') !== -1);
    });
  },
  function (err, res) {
    console.log('async callback:', err, res);
  }
);

asyncFilter(
  ['abc', 'bcd', 'cde', 'def'],
  function (val) {
    return new Promise(function (rs) {
      setTimeout(function() {
        rs(val.indexOf('cd') !== -1);
      }, 10);
    });
  },
  function (err, res) {
    console.log('promise callback:', err, res);
  }
);

asyncFilter(
  ['abc', 'bcd', 'cde', 'def'],
  function (val) {
    return val.indexOf('cd') !== -1;
  },
  function (err, res) {
    console.log('sync callback:', err, res);
  }
);

```

output:

```
⌘ node example/filter.js
sync callback: null [ 'bcd', 'cde' ]
async callback: null [ 'bcd', 'cde' ]
promise callback: null [ 'bcd', 'cde' ]

```


## asyncFilter(arr, fn, done)

Filter `arr` using `fn`,
and the results can be accessed by the callback `done`.

### arr

Type: `Array`

The array to be filtered.

### fn

Type: `Function`

The filter function.

It can be synchronous,
with signature `fn(val, index, arr)`.
If the returned value is truthy,
`val` will be kept in the final results.

`fn` can be made asynchronous if it does one of the following.

#### Accept a callback as the 4th argument

```javascript
asyncFilter(
  ['abc', 'bcd', 'cde', 'def'],
  function (val, i, arr, next) {
    process.nextTick(function () {
      next(null, val.indexOf('cd') !== -1);
    });
  },
  function (err, res) {
    console.log('async callback:', err, res);
  }
);
```

#### Return a promise

```javascript
asyncFilter(
  ['abc', 'bcd', 'cde', 'def'],
  function (val) {
    return new Promise(function (rs) {
      setTimeout(function() {
        rs(val.indexOf('cd') !== -1);
      }, 10);
    });
  },
  function (err, res) {
    console.log('promise callback:', err, res);
  }
);
```

### done

Type: `Function`

Signature: `done(err, results)`

Called when all elements are checked.

If an error is thrown when executing `fn`,
or the `next` callback is passed a truthy value as the first argument,
or the returned promise rejects,
`done` will be called immediately,
and filtering finishes.

