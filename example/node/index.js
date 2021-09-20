// import { Trans97 } from '../dist/index.js';

const { Trans97 } = require('../../lib/index.js');

const trans97 = new Trans97({
  type: 'twd97'
});

console.log(trans97.getLocation(24, 121));
const data = {
  originTwd97X: 250000,
  originTwd97Y: 2655023,
  observationTwd97X: 250123,
  observationTwd97Y: 2655059
};
console.log(trans97.getDistance(data));

const wgs84 = new Trans97({
  type: 'wgs84'
});
const wgs84Data = {
  originLat: 24,
  originLng: 121,
  observationLat: 24.1,
  observationLng: 121.3
};
console.log(wgs84.getLocation(270269, 2710413));

console.log(wgs84.getDistance(wgs84Data));
