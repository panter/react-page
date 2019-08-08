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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var Editable_1 = __importDefault(require("./components/Editable"));
exports.Editable = Editable_1.default;
var store_1 = __importDefault(require("./store"));
var actions_1 = require("./actions");
var selector_1 = require("./selector");
var plugin_1 = __importDefault(require("./service/plugin"));
exports.PluginService = plugin_1.default;
var default_1 = __importDefault(require("./service/plugin/default"));
var forEach_1 = __importDefault(require("ramda/src/forEach"));
var react_dnd_html5_backend_1 = __importStar(require("react-dnd-html5-backend"));
var react_dnd_1 = require("react-dnd");
var reducer_1 = require("./reducer");
exports.reducer = reducer_1.reducer;
var lazyLoad_1 = __importDefault(require("./helper/lazyLoad"));
exports.lazyLoad = lazyLoad_1.default;
var const_1 = require("./const");
var instance;
var initialState = function () { return ({
    reactPage: {
        editables: {
            past: [],
            present: [],
            future: [],
        },
    },
}); };
var nativeTypes = function (editor) {
    return editor.plugins.hasNativePlugin()
        ? [react_dnd_html5_backend_1.NativeTypes.URL, react_dnd_html5_backend_1.NativeTypes.FILE, react_dnd_html5_backend_1.NativeTypes.TEXT]
        : [];
};
var update = function (editor) { return function (editable) {
    var state = editor.plugins.unserialize(editable);
    actions_1.actions(editor.store.dispatch).editable.update(__assign({}, state, { config: {
            plugins: editor.plugins,
            whitelist: editor.plugins.getRegisteredNames().concat(nativeTypes(editor)),
        } }));
}; };
var dndBackend = react_dnd_html5_backend_1.default;
/**
 * Editor is the core interface for dealing with the editor.
 */
var Editor = /** @class */ (function () {
    function Editor(_a) {
        var _b = _a === void 0 ? {} : _a, plugins = _b.plugins, _c = _b.middleware, middleware = _c === void 0 ? [] : _c, _d = _b.editables, editables = _d === void 0 ? [] : _d, _e = _b.defaultPlugin, defaultPlugin = _e === void 0 ? default_1.default : _e, dragDropBackend = _b.dragDropBackend, store = _b.store;
        var _this = this;
        this.query = {};
        this.refreshEditables = function () {
            forEach_1.default(function (editable) {
                if (!const_1.isProduction) {
                    // tslint:disable-next-line:no-console
                    console.log(_this.plugins.serialize(editable));
                }
                // tslint:disable-next-line:no-any
                _this.trigger.editable.update(_this.plugins.serialize(editable));
            }, _this.store.getState().reactPage.editables.present);
        };
        // tslint:disable-next-line:no-any
        this.setLayoutPlugins = function (plugins) {
            if (plugins === void 0) { plugins = []; }
            _this.plugins.setLayoutPlugins(plugins);
            _this.refreshEditables();
        };
        this.addLayoutPlugin = function (config) {
            _this.plugins.addLayoutPlugin(config);
            _this.refreshEditables();
        };
        this.removeLayoutPlugin = function (name) {
            _this.plugins.removeLayoutPlugin(name);
            _this.refreshEditables();
        };
        this.setContentPlugins = function (plugins) {
            if (plugins === void 0) { plugins = []; }
            _this.plugins.setContentPlugins(plugins);
            _this.refreshEditables();
        };
        this.addContentPlugin = function (config) {
            _this.plugins.addContentPlugin(config);
            _this.refreshEditables();
        };
        this.removeContentPlugin = function (name) {
            _this.plugins.removeContentPlugin(name);
            _this.refreshEditables();
        };
        if (instance) {
            console.warn('You defined multiple instances of the Editor class, this can cause problems.');
        }
        instance = this;
        this.store = store || store_1.default(initialState(), middleware);
        this.plugins = new plugin_1.default(plugins);
        this.middleware = middleware;
        this.trigger = actions_1.actions(this.store.dispatch);
        this.query = selector_1.selectors(this.store);
        this.defaultPlugin = defaultPlugin;
        this.dragDropContext = react_dnd_1.DragDropContext(dragDropBackend || dndBackend);
        // tslint:disable-next-line:no-any
        this.trigger.editable.add = update(this);
        // tslint:disable-next-line:no-any
        this.trigger.editable.update = update(this);
        editables.forEach(this.trigger.editable.add);
    }
    return Editor;
}());
exports.Editor = Editor;
exports.createEmptyState = function () {
    return ({ id: uuid_1.v4(), cells: [] });
};
exports.default = Editor;
//# sourceMappingURL=index.js.map