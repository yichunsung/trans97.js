import { Settings } from './utils';
import { TWD97 } from './twd97';
import { WGS84 } from './wgs84';
import { 
  BuilderOptions,
  WGS84ConvertData,
  TWD97ConvertData
} from './interfaces/core.interface';

export class Trans97 extends Settings {

  public getLocation;
  public getDistance;

  constructor(options: BuilderOptions) {
    super();
    const { type } = options;
    if (type === 'twd97') {
      this.getLocation = new TWD97().getLocation;
      this.getDistance = new TWD97().getDistance;
    } else if (type === 'wgs84') {
      this.getLocation = new WGS84().getLocation;
      this.getDistance = new WGS84().getDistance;
    }
  }
}