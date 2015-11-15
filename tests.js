var test   = require("tape");
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
