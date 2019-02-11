# trans97.js

## JS package Usage

```bat

npm install trans97

```

## JS Documentation

### WGS84 to TWD97
Using function WGS84toTWD97 to convert WGS84 data to TWD97 data.

```js
import TransTWD97 from 'trans97'; 
const trans97 = new TransTWD97(); 
let data97 = trans97.WGS84toTWD97(24.436754363242862, 121.02299909658434); 
// TWD97 X value will get from object.eastingFix97 
document.getElementById('demoTWD97_x').innerHTML = data97.eastingFix97; 
// TWD97 Y value will get from object.northingFix97 
document.getElementById('demoTWD97_y').innerHTML = data97.northingFix97; 
```

### TWD97 to WGS84

Using function TWD97toWGS84 to convert TWD97 data to WGS84 data.


```js
import TransTWD97 from 'trans97'; 
const trans97 = new TransTWD97(); 
let dataWGS84 = trans97.TWD97toWGS84(252332, 2703394); 
// Latitude value will get from object.lat 
document.getElementById('demoLat').innerHTML = dataWGS84.lat; 
// Longitude value will get from object.lng 
document.getElementById('demoLng').innerHTML = dataWGS84.lng; 
```

### WGS84 to TWD67

TWD67 is old location system for Taiwan, it was built in 1967.

However, some open data still used by TWD67 system. 

Therefore, you can use WGS84toTWD67 to convert WGS84 data to TWD67 data.

```js
import TransTWD97 from 'trans97'; 
const trans97 = new TransTWD97(); 
let data67 = trans97.WGS84toTWD67(24.436754363242862, 121.02299909658434); 
// TWD67 X value will get from object.eastingFix67 
document.getElementById('demoTWD67_x').innerHTML = data67.eastingFix67; 
// TWD67 Y value will get from object.northingFix67 
document.getElementById('demoTWD67_y').innerHTML = data67.northingFix67; 
```

### Distance of TWD97

Using function distance_TWD97 to calculate the distance of 2 points by TWD97 data.

```js
import TransTWD97 from 'trans97'; 
const trans97 = new TransTWD97(); 
let distance97 = trans97.distance_TWD97(252332, 2703394, 252340, 2703300); 
document.getElementById('demoDistance97').innerHTML = distance97; 
```

### Distance of WGS84

Using function distance_WGS84 to calculate the distance of 2 points by WGS84 data.

```js
import TransTWD97 from 'trans97'; 
const trans97 = new TransTWD97(); 
let distanceWGS84 = trans97.distance_WGS84(24.436, 121.0229, 24.300, 121); 
document.getElementById('demoDistanceWGS84').innerHTML = distanceWGS84; 
```