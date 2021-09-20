import { WGS84 } from '../src/wgs84';

describe('WGS84 class', () => {
  const wgs84 = new WGS84();

  it('Build WGS84 class', () => {
    expect(wgs84).toBeTruthy();
  });

  it('Call getLocation function', () => {
    expect(wgs84.getLocation(270269, 2710413)).toEqual({ lat: 24.499998364227416, lng: 121.20000042320393 });
  });

  it('Call getDistance function', () => {
    const wgs84Data = {
      originLat: 24,
      originLng: 121,
      observationLat: 24.1,
      observationLng: 121.3
    };
    expect(wgs84.getDistance(wgs84Data)).toEqual(32.4647448320482);
  });
});
