# trans97.js

<p align="center">

![checks](https://img.shields.io/github/checks-status/yichunsung/trans97.js/master?style=flat-square)![coverage](https://img.shields.io/badge/coverage-100%25-brightgreen?style=flat-square)![GitHub Workflow Status](https://img.shields.io/github/workflow/status/yichunsung/trans97.js/Test%20Action?style=flat-square)[![Codacy Badge](https://app.codacy.com/project/badge/Grade/68f7468f007b46e592c3cfc30e08bc7d)](https://www.codacy.com/gh/yichunsung/trans97.js/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=yichunsung/trans97.js&amp;utm_campaign=Badge_Grade)![npm](https://img.shields.io/npm/v/trans97?style=flat-square)![npm type definitions](https://img.shields.io/npm/types/trans97?style=flat-square)![GitHub Release Date](https://img.shields.io/github/release-date/yichunsung/trans97.js?style=flat-square)![GitHub last commit](https://img.shields.io/github/last-commit/yichunsung/trans97.js?style=flat-square)![npm bundle size](https://img.shields.io/bundlephobia/min/trans97?style=flat-square)![npm](https://img.shields.io/npm/dt/trans97?style=flat-square)![NPM](https://img.shields.io/npm/l/trans97?style=flat-square)

</p>

> Current Version: v1.0.0 RC version.

## Usage

### Install

```bash
$ npm install trans97
```

## Documentation

### Basic Usage


* ES6 module

```js

import { Trans97 } from 'trans97';

const trans97 = new Trans97({
  type: 'wgs84'
});

```

* node.js module

```js

const { Trans97 } = require('trans97');

const trans97 = new Trans97({
  type: 'wgs84'
});

```

* type: `string`

  * value: `wgs84` or `twd97`
  * description: if you want to convert TWD97 format to WGS84 format.



### WGS84 to TWD97

Convert WGS84 data to TWD97 data.

```js

const position = trans97.getLocation(24.56, 121.2);
console.log(position);
// data output: { x: 270269, y: 2710413 }
```

### TWD97 to WGS84

Using function TWD97toWGS84 to convert TWD97 data to WGS84 data.

```js
const position = trans97.getLocation(270269, 2710413);
console.log(position);
// data output: { lat: 24.499998364227416, lng: 121.20000042320393 }
```

### Distance of TWD97

Using function distance_TWD97 to calculate the distance of 2 points by TWD97 data.

```js
const distance97 = trans97.getDistance(252332, 2703394, 252340, 2703300); 
```

### Distance of WGS84

Using function distance_WGS84 to calculate the distance of 2 points by WGS84 data.

```js
const distanceWGS84 = trans97.getDistance(24.436, 121.0229, 24.300, 121); 
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT @ [yichunsung](https://github.com/yichunsung)

