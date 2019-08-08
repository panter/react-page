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
import semver, { satisfies } from 'semver';
import { ContentPlugin, LayoutPlugin, NativePlugin, } from './classes';
import defaultPlugin from './default';
import { layoutMissing, contentMissing } from './missing';
const find = (name, version = '*') => (plugin) => plugin.name === name && satisfies(plugin.version, version);
/**
 * Iterate through an editable content tree and generate ids where missing.
 */
export const generateMissingIds = (props) => {
    const { rows, cells, id } = props;
    if ((rows || []).length > 0) {
        props.rows = rows.map(generateMissingIds);
    }
    else if ((cells || []).length > 0) {
        props.cells = cells.map(generateMissingIds);
    }
    return Object.assign({}, props, { id: id || v4() });
};
/**
 * PluginService is a registry of all content and layout plugins known to the editor.
 */
export default class PluginService {
    /**
     * Instantiate a new PluginService instance. You can provide your own set of content and layout plugins here.
     */
    constructor({ content = [], layout = [], native, } = {}) {
        this.hasNativePlugin = () => Boolean(this.plugins.native);
        this.getNativePlugin = () => this.plugins.native;
        this.createNativePlugin = (
        // tslint:disable-next-line:no-any
        hover, 
        // tslint:disable-next-line:no-any
        monitor, 
        // tslint:disable-next-line:no-any
        component) => {
            const native = this.plugins.native;
            if (!native) {
                const insert = new NativePlugin({});
                // tslint:disable-next-line:no-any
                const cell = { node: insert, rawNode: () => insert };
                return cell;
            }
            else {
                const plugin = new NativePlugin(native(hover, monitor, component));
                const initialState = plugin.createInitialState();
                // tslint:disable-next-line:no-any
                let insert = { content: { plugin, state: initialState } };
                /*if (plugin === 'layout') {
                  insert = { layout: { plugin, state: initialState } };
                }*/
                // tslint:disable-next-line:no-any
                const cell = { node: insert, rawNode: () => insert };
                return cell;
            }
        };
        this.setLayoutPlugins = (plugins = []) => {
            this.plugins.layout = [];
            plugins.forEach(plugin => this.addLayoutPlugin(plugin));
        };
        this.addLayoutPlugin = (config) => {
            this.plugins.layout.push(new LayoutPlugin(config));
        };
        this.removeLayoutPlugin = (name) => {
            this.plugins.layout = this.plugins.layout.filter((plugin) => plugin.name !== name);
        };
        this.setContentPlugins = (plugins = []) => {
            this.plugins.content = [];
            // semicolon is required to avoid syntax error
            [defaultPlugin, ...plugins].forEach(plugin => this.addContentPlugin(plugin));
        };
        this.addContentPlugin = (config) => {
            this.plugins.content.push(new ContentPlugin(config));
        };
        this.removeContentPlugin = (name) => {
            this.plugins.content = this.plugins.content.filter((plugin) => plugin.name !== name);
        };
        /**
         * Finds a layout plugin based on its name and version.
         */
        this.findLayoutPlugin = (name, version) => {
            const plugin = this.plugins.layout.find(find(name, version));
            let pluginWrongVersion = undefined;
            if (!plugin) {
                pluginWrongVersion = this.plugins.layout.find(find(name, '*'));
            }
            return {
                plugin: plugin ||
                    new LayoutPlugin(layoutMissing({ name, version })),
                pluginWrongVersion,
            };
        };
        /**
         * Finds a content plugin based on its name and version.
         */
        this.findContentPlugin = (name, version) => {
            const plugin = this.plugins.content.find(find(name, version));
            let pluginWrongVersion = undefined;
            if (!plugin) {
                pluginWrongVersion = this.plugins.content.find(find(name, '*'));
            }
            return {
                plugin: plugin ||
                    new ContentPlugin(contentMissing({ name, version })),
                pluginWrongVersion,
            };
        };
        /**
         * Returns a list of all known plugin names.
         */
        this.getRegisteredNames = () => [
            ...this.plugins.content.map(({ name }) => name),
            ...this.plugins.layout.map(({ name }) => name),
        ];
        this.migratePluginState = (
        // tslint:disable-next-line:no-any
        state, plugin, dataVersion
        // tslint:disable-next-line:no-any
        ) => {
            if (!plugin || !dataVersion || semver.valid(dataVersion) === null) {
                return state;
            }
            let currentDataVersion = dataVersion;
            let migrations = plugin.migrations ? plugin.migrations : [];
            while (true) {
                const migration = migrations.find(m => semver.satisfies(currentDataVersion, m.fromVersionRange));
                migrations = migrations.filter(m => !semver.satisfies(currentDataVersion, m.fromVersionRange));
                if (!migration) {
                    // We assume all migrations necessary for the current version of plugin to work are provided
                    // Therefore if we don't find any, that means we are done and state is up to date
                    break;
                }
                currentDataVersion = migration.toVersion;
                state = migration.migrate(state);
            }
            return state;
        };
        // tslint:disable-next-line:no-any
        this.getNewPluginState = (found, state, version) => {
            if (!found.pluginWrongVersion ||
                semver.lt(found.pluginWrongVersion.version, version)) {
                // Standard case
                return {
                    plugin: found.plugin,
                    state: found.plugin.unserialize(state),
                };
            }
            else {
                // Attempt to migrate
                const migratedState = this.migratePluginState(state, found.pluginWrongVersion, version);
                if (found.pluginWrongVersion && migratedState) {
                    return {
                        plugin: found.pluginWrongVersion,
                        state: found.pluginWrongVersion.unserialize(migratedState),
                    };
                }
                else {
                    // Unable to migrate, fallback to missing plugin
                    return {
                        plugin: found.plugin,
                        state: found.plugin.unserialize(state),
                    };
                }
            }
        };
        // tslint:disable-next-line:no-any
        this.unserialize = (state) => {
            const { rows = [], cells = [], content = {}, layout = {}, inline, size, id, } = state;
            const newState = { id, inline, size };
            const { plugin: { name: contentName = null, version: contentVersion = '*' } = {}, state: contentState = {}, } = content || {};
            const { plugin: { name: layoutName = null, version: layoutVersion = '*' } = {}, state: layoutState = {}, } = layout || {};
            if (contentName) {
                const found = this.findContentPlugin(contentName, contentVersion);
                const newContentState = this.getNewPluginState(found, contentState, contentVersion);
                newState.content = newContentState;
            }
            if (layoutName) {
                const found = this.findLayoutPlugin(layoutName, layoutVersion);
                const newLayoutState = this.getNewPluginState(found, layoutState, layoutVersion);
                newState.layout = newLayoutState;
            }
            if ((rows || []).length) {
                newState.rows = rows.map(this.unserialize);
            }
            if ((cells || []).length) {
                newState.cells = cells.map(this.unserialize);
            }
            return generateMissingIds(newState);
        };
        // tslint:disable-next-line:no-any
        this.serialize = (state) => {
            const { rows = [], cells = [], content, layout, inline, size, id } = state;
            // tslint:disable-next-line:no-any
            const newState = { id, inline, size };
            if (content && content.plugin) {
                newState.content = {
                    plugin: { name: content.plugin.name, version: content.plugin.version },
                    state: content.plugin.serialize(content.state),
                };
            }
            if (layout && layout.plugin) {
                newState.layout = {
                    plugin: { name: layout.plugin.name, version: layout.plugin.version },
                    state: layout.plugin.serialize(layout.state),
                };
            }
            if (rows.length) {
                newState.rows = rows.map(this.serialize);
            }
            if (cells.length) {
                newState.cells = cells.map(this.serialize);
            }
            return newState;
        };
        this.plugins = {
            content: [defaultPlugin, ...content].map(
            // tslint:disable-next-line:no-any
            (config) => new ContentPlugin(config)),
            // tslint:disable-next-line:no-any
            layout: layout.map((config) => new LayoutPlugin(config)),
            native: native,
        };
    }
}
//# sourceMappingURL=index.js.map