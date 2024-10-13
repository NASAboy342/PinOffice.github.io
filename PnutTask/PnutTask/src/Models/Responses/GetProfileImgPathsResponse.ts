import { BaseResponse } from '../BaseResponse.js';
import { Img } from '../Img.js';

export interface GetProfileImgPathsResponse extends BaseResponse {
    imgs: Img[]
}