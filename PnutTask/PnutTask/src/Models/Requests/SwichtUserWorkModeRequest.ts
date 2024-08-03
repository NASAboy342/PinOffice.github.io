import { EnumWorkMode } from '../Enums/EnumWorkMode.js';

export interface ISwichtUserWorkModeRequest{
    userId: number,
    workMode: EnumWorkMode
}