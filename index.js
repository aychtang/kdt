var dist    = require("euclidean-distance");
var btree   = require("btree-helpers");
var isEqual = require('array-equal');

// Types:
// P = Array<number>
// N = { left     : N;
//       right    : N;
//       location : P;
//     }

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
  if (isEqual(t.location, p))     return t;
  if (btree.isLeaf(t))            return null;

  var axis = d % k;

  if (p[axis] < t.location[axis]) return locate(t.left , p, k, d + 1);
  else                            return locate(t.right, p, k, d + 1);
};

// <N, P> (t : N, p : P, k : number)
var nearestNeighbour = function (t, p, k) {
  var guess    = null;
  var bestDist = Infinity;

  function search (t, p, k, d)
  {
    if (t == null) return guess;

    var axis = d % k;

    if (guess) {
      var distance = dist(t.location, guess.location);
      if (distance < bestDist) {
        guess    = t;
        bestDist = distance;
      }
    } else {
      guess = t;
    }

    if (p[axis] < t.location[axis]) return search(t.left , p, k, d + 1);
    else                            return search(t.right, p, k, d + 1);
  }

  return search(t, p, k, 0);
};

exports.locate           = locate;
exports.makeTree         = kdtree;
exports.nearestNeighbour = nearestNeighbour;
