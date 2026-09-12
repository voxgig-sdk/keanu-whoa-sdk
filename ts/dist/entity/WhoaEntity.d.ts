import { KeanuWhoaEntityBase } from '../KeanuWhoaEntityBase';
import type { KeanuWhoaSDK } from '../KeanuWhoaSDK';
import type { Control } from '../types';
import type { Whoa, WhoaLoadMatch, WhoaListMatch } from '../KeanuWhoaTypes';
declare class WhoaEntity extends KeanuWhoaEntityBase<Whoa> {
    constructor(client: KeanuWhoaSDK, entopts: any);
    make(this: WhoaEntity): WhoaEntity;
    load(this: any, reqmatch?: WhoaLoadMatch, ctrl?: Control): Promise<WhoaEntity>;
    list(this: any, reqmatch?: WhoaListMatch, ctrl?: Control): Promise<WhoaEntity[]>;
}
export { WhoaEntity };
