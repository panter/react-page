import { ContentPlugin, LayoutPlugin, Plugin, LayoutPluginProps, ContentPluginProps, Plugins, PluginsInternal } from './classes';
import { ComponetizedCell } from '../../types/editable';
import { EditorState } from '../../types/editor';
/**
 * Iterate through an editable content tree and generate ids where missing.
 */
export declare const generateMissingIds: (props: EditorState) => EditorState;
/**
 * PluginService is a registry of all content and layout plugins known to the editor.
 */
export default class PluginService {
    plugins: PluginsInternal;
    /**
     * Instantiate a new PluginService instance. You can provide your own set of content and layout plugins here.
     */
    constructor({ content, layout, native, }?: Plugins);
    hasNativePlugin: () => boolean;
    getNativePlugin: () => import("../../types/editable").NativeFactory;
    createNativePlugin: (hover?: any, monitor?: any, component?: any) => ComponetizedCell;
    setLayoutPlugins: (plugins?: Pick<LayoutPluginProps<any>, "text" | "createInitialChildren" | "Component" | "name" | "version" | "IconComponent" | "serialize" | "unserialize" | "description" | "handleRemoveHotKey" | "handleFocusNextHotKey" | "handleFocusPreviousHotKey" | "handleFocus" | "handleBlur" | "reducer" | "migrations" | "createInitialState">[]) => void;
    addLayoutPlugin: (config: Pick<LayoutPluginProps<any>, "text" | "createInitialChildren" | "Component" | "name" | "version" | "IconComponent" | "serialize" | "unserialize" | "description" | "handleRemoveHotKey" | "handleFocusNextHotKey" | "handleFocusPreviousHotKey" | "handleFocus" | "handleBlur" | "reducer" | "migrations" | "createInitialState">) => void;
    removeLayoutPlugin: (name: string) => void;
    setContentPlugins: (plugins?: Pick<ContentPluginProps<any>, "text" | "Component" | "name" | "version" | "IconComponent" | "serialize" | "unserialize" | "description" | "handleRemoveHotKey" | "handleFocusNextHotKey" | "handleFocusPreviousHotKey" | "handleFocus" | "handleBlur" | "reducer" | "migrations" | "createInitialState" | "allowInlineNeighbours" | "isInlineable">[]) => void;
    addContentPlugin: (config: Pick<ContentPluginProps<any>, "text" | "Component" | "name" | "version" | "IconComponent" | "serialize" | "unserialize" | "description" | "handleRemoveHotKey" | "handleFocusNextHotKey" | "handleFocusPreviousHotKey" | "handleFocus" | "handleBlur" | "reducer" | "migrations" | "createInitialState" | "allowInlineNeighbours" | "isInlineable">) => void;
    removeContentPlugin: (name: string) => void;
    /**
     * Finds a layout plugin based on its name and version.
     */
    findLayoutPlugin: (name: string, version: string) => {
        plugin: LayoutPlugin<any>;
        pluginWrongVersion?: LayoutPlugin<any>;
    };
    /**
     * Finds a content plugin based on its name and version.
     */
    findContentPlugin: (name: string, version: string) => {
        plugin: ContentPlugin<any>;
        pluginWrongVersion?: ContentPlugin<any>;
    };
    /**
     * Returns a list of all known plugin names.
     */
    getRegisteredNames: () => string[];
    migratePluginState: (state: any, plugin: Plugin<any, {}>, dataVersion: string) => any;
    getNewPluginState: (found: {
        plugin: Plugin<any, {}>;
        pluginWrongVersion?: Plugin<any, {}>;
    }, state: any, version: string) => {
        plugin: Plugin<any, {}>;
        state: any;
    };
    unserialize: (state: any) => Object;
    serialize: (state: any) => import("../../types/editable").AbstractEditable<import("../../types/editable").AbstractCell<import("../../types/editable").Row>>;
}
//# sourceMappingURL=index.d.ts.map