import { EnumWorkMode } from '../Enums/EnumWorkMode.js';
import { BaseResponse } from '../BaseResponse.js';

export interface ISwichtUserWorkModeResponse extends BaseResponse{
    workMode: EnumWorkMode,
    workModeAsString: string
}