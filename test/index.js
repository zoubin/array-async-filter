var test = require('tap').test;
var asyncFilter = require('..');

test('async', function(t) {
  t.plan(1);

  asyncFilter(
    [1, 2, 3, 4],
    function (val, i, arr, next) {
      process.nextTick(function () {
        next(val % 2);
      });
    },
    function (res) {
      t.same(res, [1, 3]);
    }
  );

});

test('promise', function(t) {
  t.plan(1);

  asyncFilter(
    [1, 2, 3, 4],
    function (val) {
      return new Promise(function (rs) {
        setTimeout(function() {
          rs(val % 2);
        }, 10);
      });
    },
    function (res) {
      t.same(res, [1, 3]);
    }
  );

});

test('sync', function(t) {
  t.plan(1);

  asyncFilter(
    [1, 2, 3, 4],
    function (val) {
      return val % 2;
    },
    function (res) {
      t.same(res, [1, 3]);
    }
  );

});

