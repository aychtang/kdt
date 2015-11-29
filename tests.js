var test   = require("tape");
var dist   = require("euclidean-distance");
var KDTree = require("./index.js");

test("Basic 2d pointlist usecase", function (t) {
  var points = [[1,2], [3,4], [5,6], [7,8]];
  var kdt    = KDTree.makeTree(points, 0, 2);

  t.deepEqual(kdt.location           , points[2]);
  t.deepEqual(kdt.left.location      , points[1]);
  t.deepEqual(kdt.left.left.location , points[0]);
  t.deepEqual(kdt.right.location     , points[3]);

  t.end();
});

test("Locate(t, p, k, d)", function (t) {
  var points = [[1,2], [3,4], [5,6], [7,8]];
  var kdt    = KDTree.makeTree(points, 0, 2);

  t.deepEqual(kdt.left.location      , points[1]);
  t.deepEqual(KDTree.locate(kdt, points[1], 2, 0), kdt.left);

  t.end();
});

test("NearestNeighbour(t, p, k)", function (t) {
  var points = [[1,2], [3,4], [5,6], [7,8]];
  var kdt    = KDTree.makeTree(points, 0, 2);

  t.deepEqual(KDTree.nearestNeighbour(kdt, points[0], 2).location, points[1]);

  t.end();
});
