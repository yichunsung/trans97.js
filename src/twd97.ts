import { Settings } from './utils';
import {
  TWD97Dto,
  TWD97DistanceRequestObj
} from './interfaces/twd97.interface';

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
  getLocation(lat: number, lng: number): TWD97Dto {

    const a = this.a; // Equatorial Radius = 6378137.0 M
    const b = this.b; // Polar Radius = 6356752.314245 M
    const lng0 = this.lng0; //Taiwan central longitude = 121 degree
    const k0 = this.k0; // scaling size 

    const dx = this.dx; // horizontal coordinate offset
    const dy = this.dy; // Vertical coordinate offset

    const e: number = Math.sqrt(1 - (b * b) / (a * a));

    const f: number = (a - b) / a; // flat rate

    const n: number = (a - b) / (a + b);

    const AA: number = (a / (1 + n)) * (1 + (1 / 4) * n ** 2 + (1 / 64) * n ** 4 + (1 / 256) * n ** 6 + (25 / 16384) * n ** 8 + (49 / 65536) * n ** 10);

    const alpha1: number = (1 / 2) * n - (2 / 3) * n ** 2 + (5 / 16) * n ** 3 + (41 / 180) * n ** 4 - (127 / 288) * n ** 5 + (7891 / 37800) * n ** 6 + (72161 / 387072) * n ** 7 - (18975107 / 50803200) * n ** 8 + (60193001 / 290304000) * n ** 9 + (134592031 / 1026432000) * n ** 10;

    const alpha2: number = (13 / 48) * n ** 2 - (3 / 5) * n ** 3 + (557 / 1440) * n ** 4 + (281 / 630) * n ** 5 - (1983433 / 1935360) * n ** 6 + (13769 / 28800) * n ** 7 + (148003883 / 174182400) * n ** 8 - (705286231 / 465696000) * n ** 9 + (1703267974087 / 3218890752000) * n ** 10;

    const alpha3: number = (61 / 240) * n ** 3 - (103 / 140) * n ** 4 + (15061 / 26880) * n ** 5 + (167603 / 181440) * n ** 6 - (67102379 / 29030400) * n ** 7 + (79682431 / 79833600) * n ** 8 + (6304945039 / 2128896000) * n ** 9 - (6601904925257 / 1307674368000) * n ** 10;

    const alpha4: number = (49561 / 161280) * n ** 4 - (179 / 168) * n ** 5 + (6601661 / 7257600) * n ** 6 + (97445 / 49896) * n ** 7 - (40176129013 / 7664025600) * n ** 8 + (138471097 / 66528000) * n ** 9 + (48087451385201 / 5230697472000) * n ** 10;

    const alpha5: number = (34729 / 80640) * n ** 5 - (3418889 / 1995840) * n ** 6 + (14644087 / 9123840) * n ** 7 + (2605413599 / 622702080) * n ** 8 - (31015475399 / 2583060480) * n ** 9 + (5820486440369 / 1307674368000) * n ** 10;

    const alpha6: number = (212378941 / 319334400) * n ** 6 - (30705481 / 10378368) * n ** 7 + (175214326799 / 58118860800) * n ** 8 + (870492877 / 96096000) * n ** 9 - (1328004581729000 / 47823519744000) * n ** 10;

    const alpha7: number = (1522256789 / 1383782400) * n ** 7 - (16759934899 / 3113510400) * n ** 8 + (1315149374443 / 221405184000) * n ** 9 + (71809987837451 / 3629463552000) * n ** 10;

    const alpha8: number = (1424729850961 / 743921418240) * n ** 8 - (256783708069 / 25204608000) * n ** 9 + (2468749292989890 / 203249958912000) * n ** 10;

    const alpha9: number = (21091646195357 / 6080126976000) * n ** 9 - (67196182138355800 / 3379030566912000) * n ** 10;

    const alpha10: number = (77911515623232800 / 12014330904576000) * n ** 10;

    // Load Latitude and Longitude
    const latr: number = lat * Math.PI / 180; // radian
    const Dlng: number = lng - lng0; // Difference between longitude and central meridian
    const Dlngr: number = Dlng * Math.PI / 180; // radian
    // conformal latitude
    const confLat: number = Math.atan(Math.sinh(Math.asinh(Math.tan(latr)) - e * Math.atanh(e * Math.sin(latr))));

    // sigma
    const sigma: number = Math.sinh(e * Math.atanh(e * Math.tan(latr) / Math.sqrt(1 + Math.tan(latr) ** 2)));

    // tau
    const tau: number = Math.tan(latr);
    const taup: number = Math.tan(confLat);

    const xip: number = Math.atan(taup / Math.cos(Dlngr));
    const etap: number = Math.asinh(Math.sin(Dlngr) / Math.sqrt(taup * taup + (Math.cos(Dlngr) ** 2)));

    const xi: number = xip + alpha1 * Math.sin(2 * xip) * Math.cosh(2 * etap) + alpha2 * Math.sin(4 * xip) * Math.cosh(4 * etap) + alpha3 * Math.sin(6 * xip) * Math.cosh(6 * etap) + alpha4 * Math.sin(8 * xip) * Math.cosh(8 * etap) + alpha5 * Math.sin(10 * xip) * Math.cosh(10 * etap) + alpha6 * Math.sin(12 * xip) * Math.cosh(12 * etap) + alpha7 * Math.sin(14 * xip) * Math.cosh(14 * etap);

    const eta: number = etap + alpha1 * Math.cos(2 * xip) * Math.sinh(2 * etap) + alpha2 * Math.cos(4 * xip) * Math.sinh(4 * etap) + alpha3 * Math.cos(6 * xip) * Math.sinh(6 * etap) + alpha4 * Math.cos(8 * xip) * Math.sinh(8 * etap) + alpha5 * Math.cos(10 * xip) * Math.sinh(10 * etap) + alpha6 * Math.cos(12 * xip) * Math.sinh(12 * etap) + alpha6 * Math.cos(14 * xip) * Math.sinh(14 * etap);


    const easting: number = k0 * AA * eta;
    const northing: number = k0 * AA * xi;

    const NSDirection: number = 1;
    const WEDirection: number = 1;
    const northingFix97: number = Math.round(northing);
    const eastingFix97: number = Math.round(dx + (easting * 1));

    return {
      x: eastingFix97,
      y: northingFix97
    };

  }

  /**
   * [ getDistance ]
   * @param  {TWD97DistanceRequestObj} observation [observation data]
   * @return {number}                              [Distance]
   */
  getDistance(observation: TWD97DistanceRequestObj): number {
    const {
      originTwd97X,
      originTwd97Y,
      observationTwd97X,
      observationTwd97Y
    } = observation;
    const distance: number = Math.sqrt((originTwd97X - observationTwd97X) * (originTwd97X - observationTwd97X) + (originTwd97Y - observationTwd97Y) * (originTwd97Y - observationTwd97Y)) / 1000;
    return distance;
  }

}

