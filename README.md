# trans97.js

> Current Version: v1.0.0 RC version.

## JS package Usage

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

