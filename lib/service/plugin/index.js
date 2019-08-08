"use strict";
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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var semver_1 = __importStar(require("semver"));
var classes_1 = require("./classes");
var default_1 = __importDefault(require("./default"));
var missing_1 = require("./missing");
var find = function (name, version) {
    if (version === void 0) { version = '*'; }
    return function (plugin) { return plugin.name === name && semver_1.satisfies(plugin.version, version); };
};
/**
 * Iterate through an editable content tree and generate ids where missing.
 */
exports.generateMissingIds = function (props) {
    var rows = props.rows, cells = props.cells, id = props.id;
    if ((rows || []).length > 0) {
        props.rows = rows.map(exports.generateMissingIds);
    }
    else if ((cells || []).length > 0) {
        props.cells = cells.map(exports.generateMissingIds);
    }
    return __assign({}, props, { id: id || uuid_1.v4() });
};
/**
 * PluginService is a registry of all content and layout plugins known to the editor.
 */
var PluginService = /** @class */ (function () {
    /**
     * Instantiate a new PluginService instance. You can provide your own set of content and layout plugins here.
     */
    function PluginService(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.content, content = _c === void 0 ? [] : _c, _d = _b.layout, layout = _d === void 0 ? [] : _d, native = _b.native;
        var _this = this;
        this.hasNativePlugin = function () { return Boolean(_this.plugins.native); };
        this.getNativePlugin = function () { return _this.plugins.native; };
        this.createNativePlugin = function (
        // tslint:disable-next-line:no-any
        hover, 
        // tslint:disable-next-line:no-any
        monitor, 
        // tslint:disable-next-line:no-any
        component) {
            var native = _this.plugins.native;
            if (!native) {
                var insert_1 = new classes_1.NativePlugin({});
                // tslint:disable-next-line:no-any
                var cell = { node: insert_1, rawNode: function () { return insert_1; } };
                return cell;
            }
            else {
                var plugin = new classes_1.NativePlugin(native(hover, monitor, component));
                var initialState = plugin.createInitialState();
                // tslint:disable-next-line:no-any
                var insert_2 = { content: { plugin: plugin, state: initialState } };
                /*if (plugin === 'layout') {
                  insert = { layout: { plugin, state: initialState } };
                }*/
                // tslint:disable-next-line:no-any
                var cell = { node: insert_2, rawNode: function () { return insert_2; } };
                return cell;
            }
        };
        this.setLayoutPlugins = function (plugins) {
            if (plugins === void 0) { plugins = []; }
            _this.plugins.layout = [];
            plugins.forEach(function (plugin) { return _this.addLayoutPlugin(plugin); });
        };
        this.addLayoutPlugin = function (config) {
            _this.plugins.layout.push(new classes_1.LayoutPlugin(config));
        };
        this.removeLayoutPlugin = function (name) {
            _this.plugins.layout = _this.plugins.layout.filter(function (plugin) { return plugin.name !== name; });
        };
        this.setContentPlugins = function (plugins) {
            if (plugins === void 0) { plugins = []; }
            _this.plugins.content = [];
            // semicolon is required to avoid syntax error
            [default_1.default].concat(plugins).forEach(function (plugin) {
                return _this.addContentPlugin(plugin);
            });
        };
        this.addContentPlugin = function (config) {
            _this.plugins.content.push(new classes_1.ContentPlugin(config));
        };
        this.removeContentPlugin = function (name) {
            _this.plugins.content = _this.plugins.content.filter(function (plugin) { return plugin.name !== name; });
        };
        /**
         * Finds a layout plugin based on its name and version.
         */
        this.findLayoutPlugin = function (name, version) {
            var plugin = _this.plugins.layout.find(find(name, version));
            var pluginWrongVersion = undefined;
            if (!plugin) {
                pluginWrongVersion = _this.plugins.layout.find(find(name, '*'));
            }
            return {
                plugin: plugin ||
                    new classes_1.LayoutPlugin(missing_1.layoutMissing({ name: name, version: version })),
                pluginWrongVersion: pluginWrongVersion,
            };
        };
        /**
         * Finds a content plugin based on its name and version.
         */
        this.findContentPlugin = function (name, version) {
            var plugin = _this.plugins.content.find(find(name, version));
            var pluginWrongVersion = undefined;
            if (!plugin) {
                pluginWrongVersion = _this.plugins.content.find(find(name, '*'));
            }
            return {
                plugin: plugin ||
                    new classes_1.ContentPlugin(missing_1.contentMissing({ name: name, version: version })),
                pluginWrongVersion: pluginWrongVersion,
            };
        };
        /**
         * Returns a list of all known plugin names.
         */
        this.getRegisteredNames = function () { return _this.plugins.content.map(function (_a) {
            var name = _a.name;
            return name;
        }).concat(_this.plugins.layout.map(function (_a) {
            var name = _a.name;
            return name;
        })); };
        this.migratePluginState = function (
        // tslint:disable-next-line:no-any
        state, plugin, dataVersion
        // tslint:disable-next-line:no-any
        ) {
            if (!plugin || !dataVersion || semver_1.default.valid(dataVersion) === null) {
                return state;
            }
            var currentDataVersion = dataVersion;
            var migrations = plugin.migrations ? plugin.migrations : [];
            while (true) {
                var migration = migrations.find(function (m) {
                    return semver_1.default.satisfies(currentDataVersion, m.fromVersionRange);
                });
                migrations = migrations.filter(function (m) { return !semver_1.default.satisfies(currentDataVersion, m.fromVersionRange); });
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
        this.getNewPluginState = function (found, state, version) {
            if (!found.pluginWrongVersion ||
                semver_1.default.lt(found.pluginWrongVersion.version, version)) {
                // Standard case
                return {
                    plugin: found.plugin,
                    state: found.plugin.unserialize(state),
                };
            }
            else {
                // Attempt to migrate
                var migratedState = _this.migratePluginState(state, found.pluginWrongVersion, version);
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
        this.unserialize = function (state) {
            var _a = state.rows, rows = _a === void 0 ? [] : _a, _b = state.cells, cells = _b === void 0 ? [] : _b, _c = state.content, content = _c === void 0 ? {} : _c, _d = state.layout, layout = _d === void 0 ? {} : _d, inline = state.inline, size = state.size, id = state.id;
            var newState = { id: id, inline: inline, size: size };
            var _e = content || {}, _f = _e.plugin, _g = _f === void 0 ? {} : _f, _h = _g.name, contentName = _h === void 0 ? null : _h, _j = _g.version, contentVersion = _j === void 0 ? '*' : _j, _k = _e.state, contentState = _k === void 0 ? {} : _k;
            var _l = layout || {}, _m = _l.plugin, _o = _m === void 0 ? {} : _m, _p = _o.name, layoutName = _p === void 0 ? null : _p, _q = _o.version, layoutVersion = _q === void 0 ? '*' : _q, _r = _l.state, layoutState = _r === void 0 ? {} : _r;
            if (contentName) {
                var found = _this.findContentPlugin(contentName, contentVersion);
                var newContentState = _this.getNewPluginState(found, contentState, contentVersion);
                newState.content = newContentState;
            }
            if (layoutName) {
                var found = _this.findLayoutPlugin(layoutName, layoutVersion);
                var newLayoutState = _this.getNewPluginState(found, layoutState, layoutVersion);
                newState.layout = newLayoutState;
            }
            if ((rows || []).length) {
                newState.rows = rows.map(_this.unserialize);
            }
            if ((cells || []).length) {
                newState.cells = cells.map(_this.unserialize);
            }
            return exports.generateMissingIds(newState);
        };
        // tslint:disable-next-line:no-any
        this.serialize = function (state) {
            var _a = state.rows, rows = _a === void 0 ? [] : _a, _b = state.cells, cells = _b === void 0 ? [] : _b, content = state.content, layout = state.layout, inline = state.inline, size = state.size, id = state.id;
            // tslint:disable-next-line:no-any
            var newState = { id: id, inline: inline, size: size };
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
                newState.rows = rows.map(_this.serialize);
            }
            if (cells.length) {
                newState.cells = cells.map(_this.serialize);
            }
            return newState;
        };
        this.plugins = {
            content: [default_1.default].concat(content).map(
            // tslint:disable-next-line:no-any
            function (config) { return new classes_1.ContentPlugin(config); }),
            // tslint:disable-next-line:no-any
            layout: layout.map(function (config) { return new classes_1.LayoutPlugin(config); }),
            native: native,
        };
    }
    return PluginService;
}());
exports.default = PluginService;
//# sourceMappingURL=index.js.map