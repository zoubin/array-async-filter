var test = require('tap').test;
var asyncFilter = require('..');

test('async', function(t) {
  t.plan(4);

  asyncFilter(
    ['abc', 'bcd', 'cde', 'def'],
    function (val, i, arr, next) {
      process.nextTick(function () {
        next(null, val.indexOf('cd') !== -1);
      });
    },
    function (err, res) {
      t.error(err);
      t.same(res, ['bcd', 'cde']);
    }
  );

  asyncFilter(
    ['abc', 'bcd', 1, 'def'],
    function (val, i, arr, next) {
      process.nextTick(function () {
        if (typeof val === 'string') {
          next(null, val.indexOf('cd') !== -1);
        } else {
          next('Type Error');
        }
      });
    },
    function (err, res) {
      t.equal(err, 'Type Error');
      t.same(res, ['bcd']);
    }
  );

});

test('promise', function(t) {
  t.plan(6);

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
      t.error(err);
      t.same(res, ['bcd', 'cde']);
    }
  );

  asyncFilter(
    ['abc', 'bcd', 1, 'def'],
    function (val) {
      return new Promise(function (rs) {
        rs(val.indexOf('cd') !== -1);
      });
    },
    function (err, res) {
      t.ok(err instanceof Error);
      t.same(res, ['bcd']);
    }
  );

  asyncFilter(
    ['abc', 'bcd', 1, 'def'],
    function (val) {
      return new Promise(function (rs, rj) {
        setTimeout(function() {
          if (typeof val === 'string') {
            rs(val.indexOf('cd') !== -1);
          } else {
            rj('Type Error');
          }
        }, 10);
      });
    },
    function (err, res) {
      t.equal(err, 'Type Error');
      t.same(res, ['bcd']);
    }
  );

});

test('sync', function(t) {
  t.plan(4);

  asyncFilter(
    ['abc', 'bcd', 'cde', 'def'],
    function (val) {
      return val.indexOf('cd') !== -1;
    },
    function (err, res) {
      t.error(err);
      t.same(res, ['bcd', 'cde']);
    }
  );

  asyncFilter(
    ['abc', 'bcd', 1, 'def'],
    function (val) {
      return val.indexOf('cd') !== -1;
    },
    function (err, res) {
      t.ok(err instanceof Error);
      t.same(res, ['bcd']);
    }
  );

});

