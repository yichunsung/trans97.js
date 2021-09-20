import { Trans97 } from '../src';
import { TWD97 } from '../src/twd97';
import { WGS84 } from '../src/wgs84';
jest.mock('../src/wgs84');
jest.mock('../src/twd97');

describe('Trans97 Core Class', () => {

  it('Build Trans97 main Instance in Type TWD97', () => {
    const trans97WithTwd97 = new Trans97({
      type: 'twd97'
    });
    expect(trans97WithTwd97).toBeTruthy();
    expect(TWD97).toHaveBeenCalledTimes(2);
    expect(WGS84).not.toHaveBeenCalled();
  });
  it('Build Trans97 main Instance in Type WGS84', () => {
    const trans97WithWgs84 = new Trans97({
      type: 'wgs84'
    });
    expect(trans97WithWgs84).toBeTruthy();
    expect(WGS84).toHaveBeenCalledTimes(2);
  });
});
