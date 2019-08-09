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
import Subject from '@material-ui/icons/Subject';
import * as React from 'react';
import Component from './Component';
import Renderer from './Renderer';
import * as hooks from './hooks';
import v002 from './migrations/v002';
import { pathOr } from 'ramda/src/pathOr';
import { ActionTypes } from 'redux-undo';
import { defaultSettings, defaultTranslations } from './default/settings';
import defaultPlugins from './plugins/defaultPlugins';
import * as slatePlugins from './plugins/index';
import serialization from './serialization';
import { lazyLoad } from '@react-page/core';
import createInitialState from './serialization/createInitialState';
export { defaultPlugins, slatePlugins };
const Controls = lazyLoad(() => import('./Controls/'));
export default (plugins = defaultPlugins, translations = defaultTranslations) => {
    let settings = {};
    const basePlugins = plugins ? plugins : [];
    // plugins can have child plugins, let's merge them
    settings.plugins = basePlugins.concat(basePlugins.reduce((acc, plugin) => {
        if (plugin.plugins) {
            return [...acc, ...plugin.plugins];
        }
        return acc;
    }, []));
    const serializeFunctions = serialization({ plugins });
    const mergedSettings = Object.assign({}, defaultSettings, settings);
    return {
        Component: (props) => (React.createElement(Component, Object.assign({ Renderer: Renderer, Controls: Controls, serializeFunctions: serializeFunctions }, props, mergedSettings))),
        name: 'ory/editor/core/content/slate',
        version: '0.0.2',
        IconComponent: React.createElement(Subject, null),
        text: mergedSettings.translations.pluginName,
        description: mergedSettings.translations.pluginDescription,
        allowInlineNeighbours: true,
        // tslint:disable-next-line:no-any
        reducer: (state, action) => {
            if ((action.type === ActionTypes.UNDO ||
                action.type === ActionTypes.REDO) &&
                pathOr(false, ['content', 'state', 'editorState'], state)) {
                return Object.assign({}, state, { content: Object.assign({}, state.content, { state: Object.assign({}, state.content.state, { editorState: state.content.state.editorState.merge({
                                isNative: false,
                            }) }) }) });
            }
            return state;
        },
        handleRemoveHotKey: hooks.handleRemoveHotKey,
        handleFocusPreviousHotKey: hooks.handleFocusPreviousHotKey,
        handleFocusNextHotKey: hooks.handleFocusNextHotKey,
        createInitialState: createInitialState,
        serialize: serializeFunctions.serialize,
        unserialize: serializeFunctions.unserialize,
        // TODO this is disabled because of #207
        // merge = hooks.merge
        // split = hooks.split
        migrations: [v002],
    };
};
//# sourceMappingURL=index.js.map