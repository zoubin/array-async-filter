
module.exports = function (arr, fn, done) {
  filter(arr, fn, [], 0, done);
};

function filter(arr, fn, res, i, done) {
  if (!arr || arr.length <= i) {
    return done(null, res);
  }

  var val = arr[i];

  var r;
  try {
    r = fn(val, i, arr, next);
  } catch (e) {
    return next(e, res);
  }

  if (r && typeof r.then === 'function') {
    r.then(function (keep) {
      next(null, keep);
    }, function (err) {
      next(err || new Error('Rejected'));
    });
  } else if (fn.length < 4) {
    // `sync`
    next(null, r);
  }

  function next(err, keep) {
    if (err) {
      return done(err, res);
    }
    if (keep) {
      res.push(val);
    }
    filter(arr, fn, res, ++i, done);
  }
}

