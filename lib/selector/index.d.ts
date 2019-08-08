import { editable, editables } from './editable';
import { Store } from 'redux';
import { RootState } from '../types/state';
export declare const selectors: (store: Store<RootState>) => {
    editable: (id: string) => import("../types/editable").AbstractEditable<import("../types/editable").AbstractCell<import("../types/editable").Row>>;
    editables: (id: string) => import("../types/editable").AbstractEditable<import("../types/editable").AbstractCell<import("../types/editable").Row>>[];
};
export { editable, editables, RootState };
//# sourceMappingURL=index.d.ts.map