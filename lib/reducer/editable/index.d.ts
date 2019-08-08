import { EditorState } from '../../types/editor';
import { AnyAction } from 'redux';
export declare const rawEditableReducer: (state: EditorState, action: AnyAction) => {
    cells: import("../../types/editable").AbstractCell<import("../../types/editable").Row>[];
    cellOrder: any;
};
export declare const editable: (state: EditorState, action: AnyAction) => {
    cells: import("../../types/editable").AbstractCell<import("../../types/editable").Row>[];
    cellOrder: any;
};
//# sourceMappingURL=index.d.ts.map