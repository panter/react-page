import { ContentPluginConfig } from '@react-page/core/lib/service/plugin/classes';
import { ImageState } from './types/state';
import { ImageSettings } from './types/settings';
declare const imagePlugin: (settings?: Partial<ImageSettings>) => ContentPluginConfig<ImageState>;
declare const image: Pick<import("@react-page/core/lib/service/plugin/classes").ContentPluginProps<ImageState>, "allowInlineNeighbours" | "isInlineable" | "Component" | "name" | "version" | "IconComponent" | "text" | "serialize" | "unserialize" | "description" | "handleRemoveHotKey" | "handleFocusNextHotKey" | "handleFocusPreviousHotKey" | "handleFocus" | "handleBlur" | "reducer" | "migrations" | "createInitialState">;
export default image;
export { imagePlugin };
//# sourceMappingURL=index.d.ts.map