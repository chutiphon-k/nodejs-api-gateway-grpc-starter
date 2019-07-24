import { ITokenDetail } from './interfaces';

export const tokenDetailSerializer = (tokenDetail: ITokenDetail): string => JSON.stringify(tokenDetail);

export const tokenDetailDeserializer = (tokenDetail: string): ITokenDetail => JSON.parse(tokenDetail);
