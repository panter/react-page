import Editable from './components/Editable';
import { ActionsTypes } from './actions';
import PluginService from './service/plugin';
import { EditableType } from './types/editable';
import { reducer } from './reducer';
import { Store, Middleware } from 'redux';
import { RootState } from './types/state';
import lazyLoad from './helper/lazyLoad';
import { Plugins, ContentPluginConfig } from './service/plugin/classes';
export interface EditorProps<T extends RootState = RootState> {
    plugins?: Plugins;
    middleware?: [];
    editables?: EditableType[];
    defaultPlugin?: ContentPluginConfig;
    dragDropBackend?: any;
    store?: Store<T>;
}
/**
 * Editor is the core interface for dealing with the editor.
 */
declare class Editor<T extends RootState = RootState> {
    store: Store<RootState>;
    plugins: PluginService;
    middleware: Middleware[];
    dragDropContext: any;
    defaultPlugin: ContentPluginConfig;
    trigger: ActionsTypes;
    query: {};
    constructor({ plugins, middleware, editables, defaultPlugin, dragDropBackend, store, }?: EditorProps<T>);
    refreshEditables: () => void;
    setLayoutPlugins: (plugins?: Pick<import("./service/plugin/classes").LayoutPluginProps<any>, "text" | "createInitialChildren" | "Component" | "name" | "version" | "IconComponent" | "serialize" | "unserialize" | "description" | "handleRemoveHotKey" | "handleFocusNextHotKey" | "handleFocusPreviousHotKey" | "handleFocus" | "handleBlur" | "reducer" | "migrations" | "createInitialState">[]) => void;
    addLayoutPlugin: (config: Pick<import("./service/plugin/classes").LayoutPluginProps<any>, "text" | "createInitialChildren" | "Component" | "name" | "version" | "IconComponent" | "serialize" | "unserialize" | "description" | "handleRemoveHotKey" | "handleFocusNextHotKey" | "handleFocusPreviousHotKey" | "handleFocus" | "handleBlur" | "reducer" | "migrations" | "createInitialState">) => void;
    removeLayoutPlugin: (name: string) => void;
    setContentPlugins: (plugins?: Pick<import("./service/plugin/classes").ContentPluginProps<any>, "text" | "Component" | "name" | "version" | "IconComponent" | "serialize" | "unserialize" | "description" | "handleRemoveHotKey" | "handleFocusNextHotKey" | "handleFocusPreviousHotKey" | "handleFocus" | "handleBlur" | "reducer" | "migrations" | "createInitialState" | "allowInlineNeighbours" | "isInlineable">[]) => void;
    addContentPlugin: (config: Pick<import("./service/plugin/classes").ContentPluginProps<any>, "text" | "Component" | "name" | "version" | "IconComponent" | "serialize" | "unserialize" | "description" | "handleRemoveHotKey" | "handleFocusNextHotKey" | "handleFocusPreviousHotKey" | "handleFocus" | "handleBlur" | "reducer" | "migrations" | "createInitialState" | "allowInlineNeighbours" | "isInlineable">) => void;
    removeContentPlugin: (name: string) => void;
}
export { PluginService, Editable, Editor, reducer, lazyLoad };
export declare const createEmptyState: () => EditableType;
export default Editor;
//# sourceMappingURL=index.d.ts.map