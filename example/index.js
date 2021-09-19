// import { Trans97 } from '../dist/index.js';

const { Trans97 } = require('../dist/index.js');

const trans97 = new Trans97({
  type: 'twd97'
});

console.log(trans97.getLocation(24.5, 121.2));

