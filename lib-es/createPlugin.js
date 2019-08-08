/*
 * This file is part of ORY Editor.
 *
 * ORY Editor is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * ORY Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with ORY Editor.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @license LGPL-3.0
 * @copyright 2016-2018 Aeneas Rekkas
 * @author Aeneas Rekkas <aeneas+oss@aeneas.io>
 *
 */
import * as React from 'react';
import Spacer from './Component/index';
import AspectRatio from '@material-ui/icons/AspectRatio';
import { defaultSettings } from './default/settings';
const createPlugin = (settings) => {
    const mergedSettings = Object.assign({}, defaultSettings, settings);
    const WrappedComponent = props => (React.createElement(Spacer, Object.assign({}, props, mergedSettings)));
    return {
        Component: WrappedComponent,
        name: 'ory/editor/core/content/spacer',
        version: '0.0.1',
        IconComponent: React.createElement(AspectRatio, null),
        text: mergedSettings.translations.pluginName,
        description: mergedSettings.translations.pluginDescription,
        handleRemoveHotKey: (_, __) => Promise.reject(),
        handleFocusPreviousHotKey: (_, __) => Promise.reject(),
        handleFocusNextHotKey: (_, __) => Promise.reject(),
        // We need this because otherwise we lose hotkey focus on elements like spoilers.
        // This could probably be solved in an easier way by listening to window.document?
        //
        // tslint:disable-next-line:no-any
        handleFocus: (props, source, ref) => {
            if (!ref) {
                return;
            }
            setTimeout(() => ref.focus());
        },
        createInitialState: () => ({
            height: 24,
        }),
    };
};
export default createPlugin;
//# sourceMappingURL=createPlugin.js.map