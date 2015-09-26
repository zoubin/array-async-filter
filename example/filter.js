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

