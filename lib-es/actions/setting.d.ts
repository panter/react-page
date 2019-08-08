import { Action } from 'redux';
export declare const UPDATE_SETTING = "UPDATE_SETTING";
export interface UpdateSettingAction extends Action {
    key: string;
    value: any;
}
export declare const updateSetting: (key: string, value: any) => UpdateSettingAction;
//# sourceMappingURL=setting.d.ts.map