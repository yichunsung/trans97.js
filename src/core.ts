import { TWD97 } from './twd97';
import { WGS84 } from './wgs84';

export class Trans97 {

  public service;

  constructor(options) {
    const { type } = options;
    if (type === 'twd97') {
      this.service = new TWD97();
    } else if (type === 'wgs84') {
      this.service = new WGS84();
    }
  }

  getLocation(data1, data2) {
    return this.service.getLocation(data1, data2);
  }

  getDistance() {
    return this.service.getDistance();
  }


}