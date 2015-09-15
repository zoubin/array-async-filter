var noop = function () {};

module.exports = function (arr, fn, done) {
  filter(arr, fn, [], 0, done);
};

function filter(arr, fn, res, i, done) {
  if (arr.length <= i) {
    return done(res);
  }

  var val = arr[i];

  var r = fn(val, i, arr, next);

  if (r && typeof r.then === 'function') {
    r.then(function (keep) {
      next(keep);
    }, noop);
  } else if (fn.length < 4) {
    // `sync`
    next(r);
  }

  function next(keep) {
    if (keep) {
      res.push(val);
    }
    filter(arr, fn, res, ++i, done);
  }
}

