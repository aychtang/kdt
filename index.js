var d = require("euclidean-distance");

// Types:
// P = Array<number>
// N = { left     : N;
//       right    : N;
//       location : P;
//     }

// <P> (a : P, b : P) : boolean
var isEqual = function (a, b) {
  if (a === b) return true;
  if (a == null || b == null || a.length !== b.length) return false;

  for (var i = 0; i < a.length; i++)
    if (a[i] !== b[i]) return false;

  return true;
};

// <N> (n : N) : boolean
var isLeaf = function (n) {
  return !n.left && !n.right;
};

// <P, N> (loc : P, l : N, r : N) : N
var make = function (loc, l, r) {
  return { left     : l
         , right    : r
         , location : loc
         };
};

// <P, N> ( ls     : Array<P>
//        , depth  : number
//        , k      : number )
//        : N
var kdtree = function (ls, depth, k) {
  if (!ls.length) return null;

  var axis = depth % k;

  ls.sort(function (a, b) { return a[axis] - b[axis]; });

  var middle = Math.floor(ls.length / 2);

  return make( ls[middle]
             , kdtree(ls.slice(0, middle)            , depth + 1, k)
             , kdtree(ls.slice(middle + 1, ls.length), depth + 1, k)
             );
};

// <N, P> ( t : N
//        , p : P
//        , k : number    - Number of dimensions
//        , d : number )  - Current depth
//        : N
var locate = function (t, p, k, d) {
  if (isEqual(t.location, n)) return t;
  if (isLeaf(t))              return null;

  var axis = d % k;

  if (n[axis] < t.location[axis])
    return locate(t.left  , n, k, d + 1);
  else
    return locate(t.right , n, k, d + 1);
};

exports.locate   = locate;
exports.makeTree = kdtree;
