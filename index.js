
// <P, N> (loc : P, l : N, r : N) : N
var make = function (loc, l, r) 
{
  return { left     : l
         , right    : r
         , location : loc
         };
};

// <P, N> ( ls    : Array<P>
//        , depth : number
//        , k?    : number )
//        : N
var kdtree = function (ls, depth, k)
{
  if (!ls.length) return null;

  var axis = depth % (k || 2); // depth mod k (default : 2).

  ls.sort(function (a, b) { return a[axis] - b[axis]; });

  var middle = Math.floor(ls.length / 2);

  return make( ls[middle]
             , kdtree(ls.slice(0, middle)            , depth + 1, k)
             , kdtree(ls.slice(middle + 1, ls.length), depth + 1, k)
             );
};

exports.makeTree = kdtree;
