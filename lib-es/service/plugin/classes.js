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
import semver from 'semver';
/**
 * @class the class used to migrate plugin content between toVersion
 */
export class Migration {
    constructor(config) {
        // tslint:disable-next-line:no-any
        this.migrate = (state) => state;
        const { toVersion, migrate, fromVersionRange } = config;
        if (!migrate ||
            !toVersion ||
            !fromVersionRange ||
            semver.valid(toVersion) === null ||
            semver.validRange(fromVersionRange) === null) {
            throw new Error(`A migration toVersion, fromVersionRange and migrate function must be defined, got ${JSON.stringify(config)}`);
        }
        this.toVersion = toVersion;
        this.migrate = migrate;
        this.fromVersionRange = fromVersionRange;
    }
}
/**
 * @class the abstract class for content and layout plugins. It will be instantiated once and used for every cell that is equipped with it.
 */
// tslint:disable-next-line:no-any
export class Plugin {
    // tslint:disable-next-line:no-any
    constructor(config) {
        /**
         * Serialize a the plugin state
         *
         * @param raw the raw state.
         * @returns the serialized state.
         */
        this.serialize = (raw) => raw;
        /**
         * Unserialize the plugin state.
         *
         * @param state the plugin state.
         * @returns the unserialized state.
         */
        this.unserialize = (state) => state;
        /**
         * Will be called when the user presses the delete key. When returning a resolving promise,
         * the cell will be removed. If the promise is rejected, nothing happens.
         *
         * @param e
         * @param props
         * @returns a promise
         */
        this.handleRemoveHotKey = (e, props) => Promise.reject();
        /**
         * Will be called when the user presses the right or down key. When returning a resolving promise,
         * the next cell will be focused. If the promise is rejected, focus stays the same.
         *
         * @param e
         * @param props
         * @returns a promise
         */
        this.handleFocusNextHotKey = (e, props) => Promise.resolve();
        /**
         * Will be called when the user presses the left or up key. When returning a resolving promise,
         * the next cell will be focused. If the promise is rejected, focus stays the same.
         *
         * @param e
         * @param props
         * @returns a promise
         */
        this.handleFocusPreviousHotKey = (e, props) => Promise.resolve();
        /**
         * This function will be called when one of the plugin's cell is blurred.
         *
         * @param props
         */
        this.handleFocus = (props, focusSource, ref) => null;
        /**
         * This function will be called when one of the plugin's cell is focused.
         *
         * @param props
         */
        this.handleBlur = (props) => null;
        /**
         * Specify a custom reducer for the plugin's cell.
         *
         * @param state
         * @param action
         */
        // tslint:disable-next-line:no-any
        this.reducer = (state, action) => state;
        const { name, version, Component, IconComponent, text, serialize, unserialize, description, handleRemoveHotKey, handleFocusNextHotKey, handleFocusPreviousHotKey, handleFocus, handleBlur, reducer, migrations, } = config;
        if (!name || !version || !Component) {
            throw new Error(`A plugin's version, name and Component must be defined, got ${JSON.stringify(config)}`);
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
}
/**
 * @class this is the base class for content plugins.
 */
// tslint:disable-next-line:no-any
export class ContentPlugin extends Plugin {
    // tslint:disable-next-line:no-any
    constructor(config) {
        super(config);
        /**
         * Create the plugin's initial state.
         *
         * @returns the initial state.
         */
        this.createInitialState = () => ({});
        /**
         * Specify a custom reducer for the plugin's cell.
         *
         * @param state
         * @param action
         */
        // tslint:disable-next-line:no-any
        this.reducer = (state, action) => state;
        const { createInitialState, allowInlineNeighbours = false, isInlineable = false, } = config;
        this.isInlineable = isInlineable;
        this.allowInlineNeighbours = allowInlineNeighbours;
        this.createInitialState = createInitialState
            ? createInitialState.bind(this)
            : this.createInitialState;
    }
}
/**
 * @class this is the base class for layout plugins.
 */
// tslint:disable-next-line:no-any
export class LayoutPlugin extends Plugin {
    constructor(config) {
        super(config);
        /**
         * Create the plugin's initial state.
         *
         * @returns the initial state.
         */
        this.createInitialState = () => ({});
        /**
         * Create the plugin's initial children (rows/cells).
         *
         * @returns the initial state.
         */
        // tslint:disable-next-line:no-any
        this.createInitialChildren = () => ({});
        const { createInitialState, createInitialChildren } = config;
        this.createInitialState = createInitialState
            ? createInitialState.bind(this)
            : this.createInitialState;
        this.createInitialChildren = createInitialChildren
            ? createInitialChildren.bind(this)
            : this.createInitialChildren;
    }
}
export class NativePlugin extends Plugin {
    // tslint:disable-next-line:no-any
    constructor(config) {
        super(config);
        /**
         * Create the plugin's initial children (rows/cells).
         *
         * @returns the initial state.
         */
        this.createInitialChildren = () => ({});
        /**
         * Create the plugin's initial state.
         *
         * @returns the initial state.
         */
        this.createInitialState = () => ({});
        const { createInitialState, allowInlineNeighbours = false, isInlineable = false, createInitialChildren, type = 'content', } = config;
        this.isInlineable = isInlineable;
        this.allowInlineNeighbours = allowInlineNeighbours;
        this.createInitialState = createInitialState
            ? createInitialState.bind(this)
            : this.createInitialState;
        this.createInitialChildren = createInitialChildren
            ? createInitialChildren.bind(this)
            : this.createInitialChildren;
        this.type = type;
    }
}
//# sourceMappingURL=classes.js.map