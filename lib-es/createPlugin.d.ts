import { ContentPluginProps } from '@react-page/core/lib/service/plugin/classes';
import { ImageState } from './types/state';
import { ImageSettings } from './types/settings';
declare const createPlugin: (settings?: ImageSettings) => Pick<ContentPluginProps<ImageState>, "allowInlineNeighbours" | "isInlineable" | "Component" | "name" | "version" | "IconComponent" | "text" | "serialize" | "unserialize" | "description" | "handleRemoveHotKey" | "handleFocusNextHotKey" | "handleFocusPreviousHotKey" | "handleFocus" | "handleBlur" | "reducer" | "migrations" | "createInitialState">;
export default createPlugin;
//# sourceMappingURL=createPlugin.d.ts.map