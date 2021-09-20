import { TWD97 } from '../src/twd97';

describe('TWD97 class', () => {
  const twd97 = new TWD97();

  it('Build TWD97 class', () => {
    expect(twd97).toBeTruthy();
  });

  it('Call getLocation function', () => {
    expect(twd97.getLocation(24, 121)).toEqual({ x: 250000, y: 2655023 });
  });

  it('Call getDistance function', () => {
    const testData = {
      originTwd97X: 250000,
      originTwd97Y: 2655023,
      observationTwd97X: 250123,
      observationTwd97Y: 2655059
    };
    expect(twd97.getDistance(testData)).toEqual(0.12816005617976295);
  });
});