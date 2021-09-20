import { Settings } from './utils';
import {
  WGS84Dto,
  WGS84DistanceRequestObj
} from './interfaces/wgs84.interface';

export class WGS84 extends Settings {

  constructor() {
    super();
  }

  /**
   * [getLocation]
   * @param  {number}   twd97X [TWD97 X]
   * @param  {number}   twd97Y [TWD97 Y]
   * @return {WGS84Dto}        [output WGS84 location format]
   */
  getLocation(twd97X: number, twd97Y: number): WGS84Dto {
    const a = this.a; // Equatorial Radius = 6378137.0 M
    const b = this.b; // Polar Radius = 6356752.314245 M
    const lng0 = this.lng0; //Taiwan central longitude = 121 degree
    const k0 = this.k0; // scaling size 

    const dx = this.dx; // horizontal coordinate offset
    // const dy = this.dy; // Vertical coordinate offset

    // e
    const e = Math.sqrt(1 - ((b * (b) / (a * a))));

    const n: number = (a - b) / (a + b);

    // ~~~~~~~Kruger Series~~~~~~~
    const AA: number = (a / (1 + n)) * (1 + (1 / 4) * n ** 2 + (1 / 64) * n ** 4 + (1 / 256) * n ** 6 + (25 / 16384) * n ** 8 + (49 / 65536) * n ** 10);

    const beta1: number = (1 / 2) * n - (2 / 3) * n ** 2 + (37 / 96) * n ** 3 - (1 / 360) * n ** 4 - (81 / 512) * n ** 5 + (96199 / 604800) * n ** 6 - (5406467 / 38707200) * n ** 7 + (7944359 / 67737600) * n ** 8 - (7378753979 / 97542144000) * n ** 9 + (25123531261 / 804722688000) * n ** 10;
    const beta2: number = (1 / 48) * n ** 2 + (1 / 15) * n ** 3 - (437 / 1440) * n ** 4 + (46 / 105) * n ** 5 - (1118711 / 3870720) * n ** 6 + (51841 / 1209600) * n ** 7 + (24749483 / 348364800) * n ** 8 - (115295683 / 1397088000) * n ** 9 + (5487737251099 / 51502252032000) * n ** 10;
    const beta3: number = (17 / 480) * n ** 3 - (37 / 840) * n ** 4 - (209 / 4480) * n ** 5 + (5569 / 90720) * n ** 6 + (9261899 / 58060800) * n ** 7 - (6457463 / 17740800) * n ** 8 + (2473691167 / 9289728000) * n ** 9 - (852549456029 / 20922789888000) * n ** 10;
    const beta4: number = (4397 / 161280) * n ** 4 - (11 / 504) * n ** 5 - (830251 / 7257600) * n ** 6 + (466511 / 2494800) * n ** 7 + (324154477 / 7664025600) * n ** 8 - (937932223 / 3891888000) * n ** 9 - (89112264211 / 5230697472000) * n ** 10;
    const beta5: number = (4583 / 161280) * n ** 5 - (108847 / 3991680) * n ** 6 - (8005831 / 63866880) * n ** 7 + (22894433 / 124540416) * n ** 8 + (112731569449 / 557941063680) * n ** 9 - (5391039814733 / 10461394944000) * n ** 10;
    const beta6: number = (20648693 / 638668800) * n ** 6 - (16363163 / 518918400) * n ** 7 - (2204645983 / 12915302400) * n ** 8 + (4543317553 / 18162144000) * n ** 9 + (54894890298749 / 167382319104000) * n ** 10;
    const beta7: number = (219941297 / 5535129600) * n ** 7 - (497323811 / 12454041600) * n ** 8 - (79431132943 / 332107776000) * n ** 9 + (4346429528407 / 12703122432000) * n ** 10;
    // const beta8: number = (191773887257 / 3719607091200) * n ** 8 - (17822319343 / 336825216000) * n ** 9 - (497155444501631 / 1422749712384000) * n ** 10;
    // const beta9: number = (11025641854267 / 158083301376000) * n ** 9 - (492293158444691 / 6758061133824000) * n ** 10;
    // const beta10: number = (7028504530429620 / 72085985427456000) * n ** 10;

    // xi and eta
    const xi: number = twd97Y / (k0 * AA);
    const eta: number = (twd97X - dx) / (k0 * AA);
    const xip: number = xi - (beta1 * Math.sin(2 * xi) * Math.cosh(2 * eta) + beta2 * Math.sin(4 * xi) * Math.cosh(4 * eta) + beta3 * Math.sin(6 * xi) * Math.cosh(6 * eta) + beta4 * Math.sin(8 * xi) * Math.cosh(8 * eta) + beta5 * Math.sin(10 * xi) * Math.cosh(10 * eta) + beta6 * Math.sin(12 * xi) * Math.cosh(12 * eta) + beta7 * Math.sin(14 * xi) * Math.cosh(14 * eta));
    const etap: number = eta - (beta1 * Math.cos(2 * xi) * Math.sinh(2 * eta) + beta2 * Math.cos(4 * xi) * Math.sinh(4 * eta) + beta3 * Math.cos(6 * xi) * Math.sinh(6 * eta) + beta4 * Math.cos(8 * xi) * Math.sinh(8 * eta) + beta5 * Math.cos(10 * xi) * Math.sinh(10 * eta) + beta6 * Math.cos(12 * xi) * Math.sinh(12 * eta) + beta7 * Math.cos(14 * xi) * Math.sinh(14 * eta));
    const taup: number = Math.sin(xip) / Math.sqrt(Math.sinh(etap) ** 2 + Math.cos(xip) ** 2);

    // Calculate for Lngitude
    const lngr: number = Math.atan(Math.sinh(etap) / Math.cos(xip));
    const lngd: number = lngr * 180 / Math.PI;
    const resultLng: number = lngd + lng0;

    // Calculate foe Latitude
    const sigma0: number = Math.sinh(e * Math.atanh(e * taup / Math.sqrt(1 + taup ** 2)));
    const f: number = taup * Math.sqrt(1 + sigma0 ** 2) - sigma0 * Math.sqrt(1 + taup ** 2) - taup;
    const dfTauDtau: number = (Math.sqrt((1 + sigma0 ** 2) * (1 + taup ** 2)) - sigma0 * taup) * (1 - e ** 2) * Math.sqrt(1 + taup ** 2) / (1 + (1 - e ** 2) * taup ** 2);
    const taup1: number = taup - f / dfTauDtau;
    const resultLat: number = Math.atan(taup1) * 180 / Math.PI;

    return {
      lat: resultLat,
      lng: resultLng
    };
  }

  /**
   * [getDistance]
   * @param  {WGS84DistanceRequestObj} observation [observation data]
   * @return {number}                              [Distance]
   */
  getDistance(observation: WGS84DistanceRequestObj): number {
    const {
      originLat,
      originLng,
      observationLat,
      observationLng
    } = observation;
    // input origin point location 
    const originPointPiLat: number = (originLat / 180) * Math.PI;
    const originPointPiLng: number = (originLng / 180) * Math.PI;
    // input observation point location data
    const obervationLatPi: number = (observationLat / 180) * Math.PI;
    const obervationLngPi: number = (observationLng / 180) * Math.PI;
    const D: number = 6378100 * Math.acos(Math.sin(obervationLatPi) * Math.sin(originPointPiLat) + Math.cos(obervationLatPi) * Math.cos(originPointPiLat) * Math.cos(obervationLngPi - originPointPiLng));
    const distance: number = D / 1000;
    return distance;
  }
}
