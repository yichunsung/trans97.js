import { TWD97 } from './twd97';

export class Trans97 {

  public service;

  constructor(options) {
    const { type } = options;
    if (type === 'twd97') {
      this.service = new TWD97();
    }
  }


}