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
import Component from './Component/index';
import { defaultSettings } from './default/settings';
import { lazyLoad } from '@react-page/core';
const Panorama = lazyLoad(() => import('@material-ui/icons/Panorama'));
const createPlugin = (settings) => {
    const mergedSettings = Object.assign({}, defaultSettings, settings);
    return {
        Component: (props) => (React.createElement(Component, Object.assign({}, props, mergedSettings))),
        name: 'ory/editor/core/content/image',
        version: '0.0.1',
        IconComponent: React.createElement(Panorama, null),
        text: mergedSettings.translations.pluginName,
        isInlineable: true,
        description: mergedSettings.translations.pluginDescription,
        handleRemoveHotKey: (_, __) => Promise.reject(),
        handleFocusPreviousHotKey: (_, __) => Promise.reject(),
        handleFocusNextHotKey: (_, __) => Promise.reject(),
        // We need this because otherwise we lose hotkey focus on elements like spoilers.
        // This could probably be solved in an easier way by listening to window.document?
        // tslint:disable-next-line:no-any
        handleFocus: (props, source, ref) => {
            if (!ref) {
                return;
            }
            setTimeout(() => ref.focus());
        },
    };
};
export default createPlugin;
//# sourceMappingURL=createPlugin.js.map