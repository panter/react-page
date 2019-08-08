import { Store } from 'redux';
import { RootState } from './types/state';
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: (settings: {}) => void;
    }
}
declare const _default: (initialState: any, middleware?: []) => Store<RootState>;
/**
 * Returns a new redux store.
 */
export default _default;
//# sourceMappingURL=store.d.ts.map