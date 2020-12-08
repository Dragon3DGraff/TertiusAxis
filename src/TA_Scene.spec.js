const sum = require("./TA_Scene.js");

let pointsArray = [
  new Vector3(0, 0, 0),
  new Vector3(1, 0, 0),
  new Vector3(0, 1, 0),
];

test("BaryCenter must be equal {0.333333, 0.333333, 0}", () => {
  expect(findBaryCenter(pointsArray)).toBeCloseTo({
    x: 0.3333,
    y: 0.3333,
    z: 0,
  });
});
