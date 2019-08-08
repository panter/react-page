import Plugin from './plugins/Plugin';
import { PluginGetComponent } from './plugins/Plugin';
import { SlateState } from './types/state';
import defaultPlugins from './plugins/defaultPlugins';
import * as slatePlugins from './plugins/index';
export { defaultPlugins, slatePlugins };
export { PluginGetComponent as SlatePluginGetComponent };
declare const _default: (plugins?: Plugin[], translations?: {
    pluginName: string;
    pluginDescription: string;
    placeholder: string;
    linkPlugin: {
        cancel: string;
        ok: string;
        createLink: string;
        linkTitlePlaceholder: string;
        linkHrefPlaceholder: string;
    };
}) => Pick<import("@react-page/core/lib/service/plugin/classes").ContentPluginProps<SlateState>, "text" | "name" | "version" | "serialize" | "unserialize" | "createInitialState" | "Component" | "IconComponent" | "description" | "handleRemoveHotKey" | "handleFocusNextHotKey" | "handleFocusPreviousHotKey" | "handleFocus" | "handleBlur" | "reducer" | "migrations" | "allowInlineNeighbours" | "isInlineable">;
export default _default;
//# sourceMappingURL=index.d.ts.map