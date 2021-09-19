// import { Trans97 } from '../dist/index.js';

const { Trans97 } = require('../../lib/index.js');

const trans97 = new Trans97({
  type: 'wgs84'
});

console.log(trans97.getLocation(270269, 2710413));

