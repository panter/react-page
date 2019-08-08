import * as React from 'react';
import { defaultSpacerState } from './../default/state';
const SpacerHtmlRenderer = ({ state: { height } = defaultSpacerState, }) => {
    return React.createElement("div", { style: { height: `${(height || 0).toString()}px` } });
};
export default SpacerHtmlRenderer;
//# sourceMappingURL=SpacerHtmlRenderer.js.map