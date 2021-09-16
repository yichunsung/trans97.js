import {
  EquatorialRadius,
  PolarRadius,
  CentralLongitude,
  ScalingSize,
  HorizontalCoordinateOffset,
  VerticalCoordinateOffset
} from './type/type';

export class Settings {

  public a: EquatorialRadius = 6378137.0;
  public b: PolarRadius = 6356752.314245;

  public lng0: CentralLongitude = 121;
  public k0: ScalingSize = 0.9999;

  public dx: HorizontalCoordinateOffset = 250000;
  public dy: VerticalCoordinateOffset = 0;

  constructor() {}

}