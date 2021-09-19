export interface WGS84Dto {
  lat: number;
  lng: number;
}

export interface WGS84DistanceRequestObj {
  originLat: number;
  originLng: number;
  observationLat: number;
  observationLng: number;
}
