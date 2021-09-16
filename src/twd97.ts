import { Settings } from './utils';


export interface TWD97Dto {
  x: number; // X axis output
  y: number; // Y axis output
}

export class TWD97 extends Settings {

  constructor() {
    super();
  }

  /**
   * [ getTWD97Location ]
   * @param {number} lat [latitude]
   * @param {number} lng [longitude]
   * @return { TWD97Dto }     [TWD97 data]
   */
  getTWD97Location(lat: number, lng: number): TWD97Dto {

    const a = this.a; // Equatorial Radius = 6378137.0 M
    const b = this.b; // Polar Radius = 6356752.314245 M
    const lng0 = this.lng0;; //Taiwan central longitude = 121 degree
    const k0 = this.k0; // scaling size 

    const dx = this.dx; // horizontal coordinate offset
    const dy = this.dy; // Vertical coordinate offset

    let e = Math.sqrt(1 - (b * b) / (a * a));

    let f = (a - b) / a; //扁平率

    let n = (a - b) / (a + b);

    let AA = (a / (1 + n)) * (1 + (1 / 4) * n ** 2 + (1 / 64) * n ** 4 + (1 / 256) * n ** 6 + (25 / 16384) * n ** 8 + (49 / 65536) * n ** 10);

    let alpha1 = (1 / 2) * n - (2 / 3) * n ** 2 + (5 / 16) * n ** 3 + (41 / 180) * n ** 4 - (127 / 288) * n ** 5 + (7891 / 37800) * n ** 6 + (72161 / 387072) * n ** 7 - (18975107 / 50803200) * n ** 8 + (60193001 / 290304000) * n ** 9 + (134592031 / 1026432000) * n ** 10;

    let alpha2 = (13 / 48) * n ** 2 - (3 / 5) * n ** 3 + (557 / 1440) * n ** 4 + (281 / 630) * n ** 5 - (1983433 / 1935360) * n ** 6 + (13769 / 28800) * n ** 7 + (148003883 / 174182400) * n ** 8 - (705286231 / 465696000) * n ** 9 + (1703267974087 / 3218890752000) * n ** 10;

    let alpha3 = (61 / 240) * n ** 3 - (103 / 140) * n ** 4 + (15061 / 26880) * n ** 5 + (167603 / 181440) * n ** 6 - (67102379 / 29030400) * n ** 7 + (79682431 / 79833600) * n ** 8 + (6304945039 / 2128896000) * n ** 9 - (6601904925257 / 1307674368000) * n ** 10;

    let alpha4 = (49561 / 161280) * n ** 4 - (179 / 168) * n ** 5 + (6601661 / 7257600) * n ** 6 + (97445 / 49896) * n ** 7 - (40176129013 / 7664025600) * n ** 8 + (138471097 / 66528000) * n ** 9 + (48087451385201 / 5230697472000) * n ** 10;

    let alpha5 = (34729 / 80640) * n ** 5 - (3418889 / 1995840) * n ** 6 + (14644087 / 9123840) * n ** 7 + (2605413599 / 622702080) * n ** 8 - (31015475399 / 2583060480) * n ** 9 + (5820486440369 / 1307674368000) * n ** 10;

    let alpha6 = (212378941 / 319334400) * n ** 6 - (30705481 / 10378368) * n ** 7 + (175214326799 / 58118860800) * n ** 8 + (870492877 / 96096000) * n ** 9 - (1328004581729000 / 47823519744000) * n ** 10;

    let alpha7 = (1522256789 / 1383782400) * n ** 7 - (16759934899 / 3113510400) * n ** 8 + (1315149374443 / 221405184000) * n ** 9 + (71809987837451 / 3629463552000) * n ** 10;

    let alpha8 = (1424729850961 / 743921418240) * n ** 8 - (256783708069 / 25204608000) * n ** 9 + (2468749292989890 / 203249958912000) * n ** 10;

    let alpha9 = (21091646195357 / 6080126976000) * n ** 9 - (67196182138355800 / 3379030566912000) * n ** 10;

    let alpha10 = (77911515623232800 / 12014330904576000) * n ** 10;

    // Load Latitude and Longitude
    let latr = lat * Math.PI / 180; // 弧度
    let Dlng = lng - lng0; // 經度與中央經線相差值
    let Dlngr = Dlng * Math.PI / 180; // 弧度
    // conformal latitude
    let confLat = Math.atan(Math.sinh(Math.asinh(Math.tan(latr)) - e * Math.atanh(e * Math.sin(latr))));

    // sigma
    let sigma = Math.sinh(e * Math.atanh(e * Math.tan(latr) / Math.sqrt(1 + Math.tan(latr) ** 2)));

    // tau = tan(lat) , taup = tau' = tan(conLat) 
    let tau = Math.tan(latr);
    let taup = Math.tan(confLat);
    // xi = North direction, conformal Xi', 
    // eta =  East direction, conformal eta.
    let xip = Math.atan(taup / Math.cos(Dlngr));
    let etap = Math.asinh(Math.sin(Dlngr) / Math.sqrt(taup * taup + (Math.cos(Dlngr) ** 2)));

    let xi = xip + alpha1 * Math.sin(2 * xip) * Math.cosh(2 * etap) + alpha2 * Math.sin(4 * xip) * Math.cosh(4 * etap) + alpha3 * Math.sin(6 * xip) * Math.cosh(6 * etap) + alpha4 * Math.sin(8 * xip) * Math.cosh(8 * etap) + alpha5 * Math.sin(10 * xip) * Math.cosh(10 * etap) + alpha6 * Math.sin(12 * xip) * Math.cosh(12 * etap) + alpha7 * Math.sin(14 * xip) * Math.cosh(14 * etap);

    let eta = etap + alpha1 * Math.cos(2 * xip) * Math.sinh(2 * etap) + alpha2 * Math.cos(4 * xip) * Math.sinh(4 * etap) + alpha3 * Math.cos(6 * xip) * Math.sinh(6 * etap) + alpha4 * Math.cos(8 * xip) * Math.sinh(8 * etap) + alpha5 * Math.cos(10 * xip) * Math.sinh(10 * etap) + alpha6 * Math.cos(12 * xip) * Math.sinh(12 * etap) + alpha6 * Math.cos(14 * xip) * Math.sinh(14 * etap);


    let easting = k0 * AA * eta;
    let northing = k0 * AA * xi;

    // 取得南北緯與東西經
    let NSSelectIndex = 0;
    let WESelectIndex = 0;

    let NSDirection = 1;
    let WEDirection = 1;
    let northingFix97 = Math.round(northing);
    let eastingFix97 = Math.round(dx + (easting * 1));

    return {
      x: eastingFix97,
      y: northingFix97
    };

  }
}

