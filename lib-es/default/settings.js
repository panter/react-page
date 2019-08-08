import * as React from 'react';
export const defaultTranslations = {
    pluginName: 'Spacer',
    pluginDescription: 'Resizeable, empty space.',
    elementHeightLabel: 'Element height (px)',
};
export const defaultSettings = {
    Controls: () => React.createElement(React.Fragment, null, " Controls for this plugin were not provided"),
    Renderer: () => React.createElement(React.Fragment, null, "Renderer; for this plugin was not provided "),
    translations: defaultTranslations,
};
//# sourceMappingURL=settings.js.map