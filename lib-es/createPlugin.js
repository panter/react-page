import * as React from 'react';
import Remove from '@material-ui/icons/Remove';
import Divider from './Component';
import { defaultSettings } from './default/settings';
const createPlugin = settings => {
    const mergedSettings = Object.assign({}, defaultSettings, settings);
    const WrappedComponent = props => (React.createElement(Divider, Object.assign({}, props, mergedSettings)));
    return {
        Component: WrappedComponent,
        name: 'ory/editor/core/content/divider',
        version: '0.0.1',
        IconComponent: React.createElement(Remove, null),
        text: mergedSettings.translations.pluginName,
        description: mergedSettings.translations.pluginDescription,
    };
};
export default createPlugin;
//# sourceMappingURL=createPlugin.js.map