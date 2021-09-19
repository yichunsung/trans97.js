import { ConvertTargetType } from '../type/type';

export interface WGS84ConvertData {
  lat: number;
  lng: number;
}

export interface TWD97ConvertData {
  x: number;
  y: number;
}

export interface BuilderOptions {
  type: ConvertTargetType,
  wgs84?: WGS84ConvertData,
  twd97?: TWD97ConvertData,
}

