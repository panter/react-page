import { Action } from 'redux';
import { EditableType } from '../types/editable';
export declare const UPDATE_EDITABLE = "UPDATE_EDITABLE";
export interface UpdateEditableAction extends Action {
    ts: Date;
    editable: EditableType;
    ids: string[];
}
export declare const updateEditable: (editable: import("../types/editable").AbstractEditable<import("../types/editable").AbstractCell<import("../types/editable").Row>>) => UpdateEditableAction;
//# sourceMappingURL=editables.d.ts.map