import { AnyAction } from 'redux';
import { Omit } from '../../types/omit';
import { NativeFactory, AbstractCell } from '../../types/editable';
export declare type Plugins = {
    layout?: LayoutPluginConfig[];
    content?: ContentPluginConfig[];
    native?: NativeFactory;
};
export declare type PluginsInternal = {
    layout?: LayoutPlugin[];
    content?: ContentPlugin[];
    native?: NativeFactory;
};
export declare type OmitInPluginConfig = 'id' | 'focus' | 'blur' | 'editable' | 'readOnly' | 'state' | 'onChange' | 'focused';
export declare type PluginConfig<T = any, ExtraProps = {}> = Omit<PluginProps<T, ExtraProps>, OmitInPluginConfig>;
export declare type ContentPluginConfig<T = any> = Omit<ContentPluginProps<T>, OmitInPluginConfig | 'isEditMode' | 'isResizeMode' | 'isLayoutMode' | 'isPreviewMode' | 'isInsertMode'>;
export declare type LayoutPluginConfig<T = any> = Omit<LayoutPluginProps<T>, OmitInPluginConfig>;
export declare type NativePluginConfig<T = any> = Omit<NativePluginProps<T>, OmitInPluginConfig>;
export declare type ContentPluginExtraProps<T = any> = {
    /**
     * @member if the cell is currently in edit mode.
     */
    isEditMode: boolean;
    /**
     * @member if the cell is currently in resize mode.
     */
    isResizeMode: boolean;
    /**
     * @member if the cell is currently in insert mode.
     */
    isInsertMode: boolean;
    /**
     * @member if the cell is currently in preview mode.
     */
    isPreviewMode: boolean;
    /**
     * @member if the cell is currently in layout mode.
     */
    isLayoutMode: boolean;
    allowInlineNeighbours?: boolean;
    isInlineable?: boolean;
    Component?: PluginComponentType<ContentPluginProps<T>>;
};
export declare type ContentPluginProps<T = any> = ContentPluginExtraProps & PluginProps<T, ContentPluginExtraProps<T>>;
export declare type LayoutPluginExtraProps<T = any> = {
    createInitialChildren?: () => any;
    Component?: PluginComponentType<LayoutPluginProps<T>>;
};
export declare type LayoutPluginProps<T = any> = LayoutPluginExtraProps & PluginProps<T, LayoutPluginExtraProps<T>>;
export declare type PluginComponentType<T = any> = React.ComponentType<T>;
export declare type PluginProps<StateT = any, ExtraPropsT = {}> = {
    /**
     * @member a unique identifier.
     */
    id: string;
    /**
     * @member the plugin's name
     */
    name: string;
    /**
     * @member if the cell is currently in readOnly mode.
     */
    readOnly: boolean;
    /**
     * @member if true, the cell is currently focused.
     */
    focused: boolean;
    /**
     * @member the plugin's state.
     */
    state: StateT;
    /**
     * @member the plugin's version
     */
    version: string;
    Component?: PluginComponentType<PluginProps<StateT, ExtraPropsT> & ExtraPropsT>;
    IconComponent?: React.ReactNode;
    text?: string;
    serialize?: (state: StateT) => any;
    unserialize?: (raw: any) => StateT;
    description?: string;
    handleRemoveHotKey?: (e: Event, props: AbstractCell<string>) => Promise<void>;
    handleFocusNextHotKey?: (e: Event, props: AbstractCell<string>) => Promise<void>;
    handleFocusPreviousHotKey?: (e: Event, props: AbstractCell<string>) => Promise<void>;
    handleFocus?: (props: PluginProps<StateT, ExtraPropsT> & ExtraPropsT, focusSource: string, ref: HTMLElement) => void;
    handleBlur?: (props: PluginProps<StateT, ExtraPropsT> & ExtraPropsT) => void;
    reducer?: (state: StateT, action: AnyAction) => StateT;
    migrations?: Migration[];
    createInitialState?: () => StateT;
    focus?: (props: {
        source: string;
    }) => void;
    blur?: (id: string) => void;
    editable?: string;
    /**
     * Should be called with the new state if the plugin's state changes.
     *
     * @param state
     */
    onChange(state: Partial<StateT>): void;
};
export interface MigrationConfig {
    toVersion: string;
    fromVersionRange: string;
    migrate: (state: any) => any;
}
/**
 * @class the class used to migrate plugin content between toVersion
 */
export declare class Migration {
    fromVersionRange: string;
    toVersion: string;
    constructor(config: MigrationConfig);
    migrate: (state: any) => any;
}
/**
 * @class the abstract class for content and layout plugins. It will be instantiated once and used for every cell that is equipped with it.
 */
export declare class Plugin<T = any, ExtraProps = {}> {
    config: PluginConfig<T, ExtraProps>;
    /**
     * @member a unique identifier of the plugin.
     */
    name: string;
    /**
     * @member describes the plugin in a few words.
     */
    description: string;
    /**
     * @member migrations used to migrate plugin state from older version to new one
     */
    migrations: Migration[];
    /**
     * @member the semantic version (www.semver.org) of this plugin.
     */
    version: string;
    /**
     * @member the icon that will be shown in the toolbar.
     */
    IconComponent: any;
    /**
     * @member the plugin's react component.
     */
    Component: any;
    /**
     * @member the text that will be shown alongside the icon in the toolbar.
     */
    text: string;
    constructor(config: PluginConfig<T, ExtraProps>);
    /**
     * Serialize a the plugin state
     *
     * @param raw the raw state.
     * @returns the serialized state.
     */
    serialize: (raw: Object) => Object;
    /**
     * Unserialize the plugin state.
     *
     * @param state the plugin state.
     * @returns the unserialized state.
     */
    unserialize: (state: Object) => Object;
    /**
     * Will be called when the user presses the delete key. When returning a resolving promise,
     * the cell will be removed. If the promise is rejected, nothing happens.
     *
     * @param e
     * @param props
     * @returns a promise
     */
    handleRemoveHotKey: (e: Event, props: ContentPluginProps<any>) => Promise<void>;
    /**
     * Will be called when the user presses the right or down key. When returning a resolving promise,
     * the next cell will be focused. If the promise is rejected, focus stays the same.
     *
     * @param e
     * @param props
     * @returns a promise
     */
    handleFocusNextHotKey: (e: Event, props: ContentPluginProps<any>) => Promise<void>;
    /**
     * Will be called when the user presses the left or up key. When returning a resolving promise,
     * the next cell will be focused. If the promise is rejected, focus stays the same.
     *
     * @param e
     * @param props
     * @returns a promise
     */
    handleFocusPreviousHotKey: (e: Event, props: ContentPluginProps<any>) => Promise<void>;
    /**
     * This function will be called when one of the plugin's cell is blurred.
     *
     * @param props
     */
    handleFocus: (props: ContentPluginProps<any>, focusSource: string, ref: HTMLElement) => void;
    /**
     * This function will be called when one of the plugin's cell is focused.
     *
     * @param props
     */
    handleBlur: (props: ContentPluginProps<any>) => void;
    /**
     * Specify a custom reducer for the plugin's cell.
     *
     * @param state
     * @param action
     */
    reducer: (state: any, action: any) => any;
}
/**
 * @class this is the base class for content plugins.
 */
export declare class ContentPlugin<StateT = any> extends Plugin<StateT, ContentPluginExtraProps> {
    /**
     * @member if isInlineable is true, the plugin is allowed to be placed with floating to left or right.
     */
    isInlineable: boolean;
    /**
     * @member if true allows that isInlineable elements may be placed "in" this plugin.
     */
    allowInlineNeighbours: boolean;
    constructor(config: ContentPluginConfig<StateT>);
    /**
     * Create the plugin's initial state.
     *
     * @returns the initial state.
     */
    createInitialState: () => Object;
    /**
     * Specify a custom reducer for the plugin's cell.
     *
     * @param state
     * @param action
     */
    reducer: (state: any, action: any) => any;
}
/**
 * @class this is the base class for layout plugins.
 */
export declare class LayoutPlugin<StateT = any> extends Plugin<StateT, LayoutPluginExtraProps> {
    constructor(config: LayoutPluginConfig<StateT>);
    /**
     * Create the plugin's initial state.
     *
     * @returns the initial state.
     */
    createInitialState: () => StateT;
    /**
     * Create the plugin's initial children (rows/cells).
     *
     * @returns the initial state.
     */
    createInitialChildren: () => any;
}
export declare type NativePluginProps<StateT = any> = PluginProps<StateT> & {
    type?: string;
    createInitialChildren?: () => any;
    allowInlineNeighbours?: boolean;
    isInlineable?: boolean;
};
export declare class NativePlugin<StateT> extends Plugin<StateT> {
    /**
     * @member can be 'content' or 'layout' depending on the type the native plugin should create
     */
    type: string;
    /**
     * @member if isInlineable is true, the plugin is allowed to be placed with floating to left or right.
     */
    isInlineable: boolean;
    /**
     * @member if true allows that isInlineable elements may be placed "in" this plugin.
     */
    allowInlineNeighbours: boolean;
    constructor(config: NativePluginConfig<StateT>);
    /**
     * Create the plugin's initial children (rows/cells).
     *
     * @returns the initial state.
     */
    createInitialChildren: () => Object;
    /**
     * Create the plugin's initial state.
     *
     * @returns the initial state.
     */
    createInitialState: () => Object;
}
//# sourceMappingURL=classes.d.ts.map