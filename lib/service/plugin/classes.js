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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var semver_1 = __importDefault(require("semver"));
/**
 * @class the class used to migrate plugin content between toVersion
 */
var Migration = /** @class */ (function () {
    function Migration(config) {
        // tslint:disable-next-line:no-any
        this.migrate = function (state) { return state; };
        var toVersion = config.toVersion, migrate = config.migrate, fromVersionRange = config.fromVersionRange;
        if (!migrate ||
            !toVersion ||
            !fromVersionRange ||
            semver_1.default.valid(toVersion) === null ||
            semver_1.default.validRange(fromVersionRange) === null) {
            throw new Error("A migration toVersion, fromVersionRange and migrate function must be defined, got " + JSON.stringify(config));
        }
        this.toVersion = toVersion;
        this.migrate = migrate;
        this.fromVersionRange = fromVersionRange;
    }
    return Migration;
}());
exports.Migration = Migration;
/**
 * @class the abstract class for content and layout plugins. It will be instantiated once and used for every cell that is equipped with it.
 */
// tslint:disable-next-line:no-any
var Plugin = /** @class */ (function () {
    // tslint:disable-next-line:no-any
    function Plugin(config) {
        /**
         * Serialize a the plugin state
         *
         * @param raw the raw state.
         * @returns the serialized state.
         */
        this.serialize = function (raw) { return raw; };
        /**
         * Unserialize the plugin state.
         *
         * @param state the plugin state.
         * @returns the unserialized state.
         */
        this.unserialize = function (state) { return state; };
        /**
         * Will be called when the user presses the delete key. When returning a resolving promise,
         * the cell will be removed. If the promise is rejected, nothing happens.
         *
         * @param e
         * @param props
         * @returns a promise
         */
        this.handleRemoveHotKey = function (e, props) {
            return Promise.reject();
        };
        /**
         * Will be called when the user presses the right or down key. When returning a resolving promise,
         * the next cell will be focused. If the promise is rejected, focus stays the same.
         *
         * @param e
         * @param props
         * @returns a promise
         */
        this.handleFocusNextHotKey = function (e, props) { return Promise.resolve(); };
        /**
         * Will be called when the user presses the left or up key. When returning a resolving promise,
         * the next cell will be focused. If the promise is rejected, focus stays the same.
         *
         * @param e
         * @param props
         * @returns a promise
         */
        this.handleFocusPreviousHotKey = function (e, props) { return Promise.resolve(); };
        /**
         * This function will be called when one of the plugin's cell is blurred.
         *
         * @param props
         */
        this.handleFocus = function (props, focusSource, ref) { return null; };
        /**
         * This function will be called when one of the plugin's cell is focused.
         *
         * @param props
         */
        this.handleBlur = function (props) { return null; };
        /**
         * Specify a custom reducer for the plugin's cell.
         *
         * @param state
         * @param action
         */
        // tslint:disable-next-line:no-any
        this.reducer = function (state, action) { return state; };
        var name = config.name, version = config.version, Component = config.Component, IconComponent = config.IconComponent, text = config.text, serialize = config.serialize, unserialize = config.unserialize, description = config.description, handleRemoveHotKey = config.handleRemoveHotKey, handleFocusNextHotKey = config.handleFocusNextHotKey, handleFocusPreviousHotKey = config.handleFocusPreviousHotKey, handleFocus = config.handleFocus, handleBlur = config.handleBlur, reducer = config.reducer, migrations = config.migrations;
        if (!name || !version || !Component) {
            throw new Error("A plugin's version, name and Component must be defined, got " + JSON.stringify(config));
        }
        this.name = name;
        this.version = version;
        this.Component = Component;
        this.IconComponent = IconComponent;
        this.text = text;
        this.description = description;
        this.config = config;
        this.migrations = migrations ? migrations : [];
        this.serialize = serialize ? serialize.bind(this) : this.serialize;
        this.unserialize = unserialize ? unserialize.bind(this) : this.unserialize;
        this.handleRemoveHotKey = handleRemoveHotKey
            ? handleRemoveHotKey.bind(this)
            : this.handleRemoveHotKey;
        this.handleFocusNextHotKey = handleFocusNextHotKey
            ? handleFocusNextHotKey.bind(this)
            : this.handleFocusNextHotKey;
        this.handleFocusPreviousHotKey = handleFocusPreviousHotKey
            ? handleFocusPreviousHotKey.bind(this)
            : this.handleFocusPreviousHotKey;
        this.handleFocus = handleFocus ? handleFocus.bind(this) : this.handleFocus;
        this.handleBlur = handleBlur ? handleBlur.bind(this) : this.handleBlur;
        this.reducer = reducer ? reducer.bind(this) : this.reducer;
    }
    return Plugin;
}());
exports.Plugin = Plugin;
/**
 * @class this is the base class for content plugins.
 */
// tslint:disable-next-line:no-any
var ContentPlugin = /** @class */ (function (_super) {
    __extends(ContentPlugin, _super);
    // tslint:disable-next-line:no-any
    function ContentPlugin(config) {
        var _this = _super.call(this, config) || this;
        /**
         * Create the plugin's initial state.
         *
         * @returns the initial state.
         */
        _this.createInitialState = function () { return ({}); };
        /**
         * Specify a custom reducer for the plugin's cell.
         *
         * @param state
         * @param action
         */
        // tslint:disable-next-line:no-any
        _this.reducer = function (state, action) { return state; };
        var createInitialState = config.createInitialState, _a = config.allowInlineNeighbours, allowInlineNeighbours = _a === void 0 ? false : _a, _b = config.isInlineable, isInlineable = _b === void 0 ? false : _b;
        _this.isInlineable = isInlineable;
        _this.allowInlineNeighbours = allowInlineNeighbours;
        _this.createInitialState = createInitialState
            ? createInitialState.bind(_this)
            : _this.createInitialState;
        return _this;
    }
    return ContentPlugin;
}(Plugin));
exports.ContentPlugin = ContentPlugin;
/**
 * @class this is the base class for layout plugins.
 */
// tslint:disable-next-line:no-any
var LayoutPlugin = /** @class */ (function (_super) {
    __extends(LayoutPlugin, _super);
    function LayoutPlugin(config) {
        var _this = _super.call(this, config) || this;
        /**
         * Create the plugin's initial state.
         *
         * @returns the initial state.
         */
        _this.createInitialState = function () { return ({}); };
        /**
         * Create the plugin's initial children (rows/cells).
         *
         * @returns the initial state.
         */
        // tslint:disable-next-line:no-any
        _this.createInitialChildren = function () { return ({}); };
        var createInitialState = config.createInitialState, createInitialChildren = config.createInitialChildren;
        _this.createInitialState = createInitialState
            ? createInitialState.bind(_this)
            : _this.createInitialState;
        _this.createInitialChildren = createInitialChildren
            ? createInitialChildren.bind(_this)
            : _this.createInitialChildren;
        return _this;
    }
    return LayoutPlugin;
}(Plugin));
exports.LayoutPlugin = LayoutPlugin;
var NativePlugin = /** @class */ (function (_super) {
    __extends(NativePlugin, _super);
    // tslint:disable-next-line:no-any
    function NativePlugin(config) {
        var _this = _super.call(this, config) || this;
        /**
         * Create the plugin's initial children (rows/cells).
         *
         * @returns the initial state.
         */
        _this.createInitialChildren = function () { return ({}); };
        /**
         * Create the plugin's initial state.
         *
         * @returns the initial state.
         */
        _this.createInitialState = function () { return ({}); };
        var createInitialState = config.createInitialState, _a = config.allowInlineNeighbours, allowInlineNeighbours = _a === void 0 ? false : _a, _b = config.isInlineable, isInlineable = _b === void 0 ? false : _b, createInitialChildren = config.createInitialChildren, _c = config.type, type = _c === void 0 ? 'content' : _c;
        _this.isInlineable = isInlineable;
        _this.allowInlineNeighbours = allowInlineNeighbours;
        _this.createInitialState = createInitialState
            ? createInitialState.bind(_this)
            : _this.createInitialState;
        _this.createInitialChildren = createInitialChildren
            ? createInitialChildren.bind(_this)
            : _this.createInitialChildren;
        _this.type = type;
        return _this;
    }
    return NativePlugin;
}(Plugin));
exports.NativePlugin = NativePlugin;
//# sourceMappingURL=classes.js.map