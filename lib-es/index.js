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
import { v4 } from 'uuid';
import Editable from './components/Editable';
import createStore from './store';
import { actions } from './actions';
import { selectors } from './selector';
import PluginService from './service/plugin';
import pluginDefault from './service/plugin/default';
import forEach from 'ramda/src/forEach';
import HTML5Backend, { NativeTypes } from 'react-dnd-html5-backend';
import { DragDropContext as dragDropContext } from 'react-dnd';
import { reducer } from './reducer';
import lazyLoad from './helper/lazyLoad';
import { isProduction } from './const';
let instance;
const initialState = () => ({
    reactPage: {
        editables: {
            past: [],
            present: [],
            future: [],
        },
    },
});
const nativeTypes = (editor) => editor.plugins.hasNativePlugin()
    ? [NativeTypes.URL, NativeTypes.FILE, NativeTypes.TEXT]
    : [];
const update = (editor) => (editable) => {
    const state = editor.plugins.unserialize(editable);
    actions(editor.store.dispatch).editable.update(Object.assign({}, state, { config: {
            plugins: editor.plugins,
            whitelist: [
                ...editor.plugins.getRegisteredNames(),
                ...nativeTypes(editor),
            ],
        } }));
};
const dndBackend = HTML5Backend;
/**
 * Editor is the core interface for dealing with the editor.
 */
class Editor {
    constructor({ plugins, middleware = [], editables = [], defaultPlugin = pluginDefault, dragDropBackend, store, } = {}) {
        this.query = {};
        this.refreshEditables = () => {
            forEach((editable) => {
                if (!isProduction) {
                    // tslint:disable-next-line:no-console
                    console.log(this.plugins.serialize(editable));
                }
                // tslint:disable-next-line:no-any
                this.trigger.editable.update(this.plugins.serialize(editable));
            }, this.store.getState().reactPage.editables.present);
        };
        // tslint:disable-next-line:no-any
        this.setLayoutPlugins = (plugins = []) => {
            this.plugins.setLayoutPlugins(plugins);
            this.refreshEditables();
        };
        this.addLayoutPlugin = (config) => {
            this.plugins.addLayoutPlugin(config);
            this.refreshEditables();
        };
        this.removeLayoutPlugin = (name) => {
            this.plugins.removeLayoutPlugin(name);
            this.refreshEditables();
        };
        this.setContentPlugins = (plugins = []) => {
            this.plugins.setContentPlugins(plugins);
            this.refreshEditables();
        };
        this.addContentPlugin = (config) => {
            this.plugins.addContentPlugin(config);
            this.refreshEditables();
        };
        this.removeContentPlugin = (name) => {
            this.plugins.removeContentPlugin(name);
            this.refreshEditables();
        };
        if (instance) {
            console.warn('You defined multiple instances of the Editor class, this can cause problems.');
        }
        instance = this;
        this.store = store || createStore(initialState(), middleware);
        this.plugins = new PluginService(plugins);
        this.middleware = middleware;
        this.trigger = actions(this.store.dispatch);
        this.query = selectors(this.store);
        this.defaultPlugin = defaultPlugin;
        this.dragDropContext = dragDropContext(dragDropBackend || dndBackend);
        // tslint:disable-next-line:no-any
        this.trigger.editable.add = update(this);
        // tslint:disable-next-line:no-any
        this.trigger.editable.update = update(this);
        editables.forEach(this.trigger.editable.add);
    }
}
export { PluginService, Editable, Editor, reducer, lazyLoad };
export const createEmptyState = () => ({ id: v4(), cells: [] });
export default Editor;
//# sourceMappingURL=index.js.map