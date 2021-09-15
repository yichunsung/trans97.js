
export interface TWD97Dto {
  x: number; // X axis output
  y: number; // Y axis output
}

export class TWD97 {

  /**
   * [ getTWD97Location ]
   * @param {number} lat [latitude]
   * @param {number} lng [longitude]
   * @return { TWD97Dto }     [TWD97 data]
   */
  getTWD97Location(lat: number, lng: number): TWD97Dto {

    return {
      x: 1,
      y: 2
    };
  }
}

