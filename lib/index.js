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
var Subject_1 = __importDefault(require("@material-ui/icons/Subject"));
var ramda_1 = require("ramda");
var React = __importStar(require("react"));
var Component_1 = __importDefault(require("./Component"));
var StaticComponent_1 = __importDefault(require("./StaticComponent"));
var hooks = __importStar(require("./hooks"));
var v002_1 = __importDefault(require("./migrations/v002"));
var pathOr_1 = require("ramda/src/pathOr");
var redux_undo_1 = require("redux-undo");
var settings_1 = require("./default/settings");
var defaultPlugins_1 = __importDefault(require("./plugins/defaultPlugins"));
exports.defaultPlugins = defaultPlugins_1.default;
var slatePlugins = __importStar(require("./plugins/index"));
exports.slatePlugins = slatePlugins;
var serialization_1 = __importDefault(require("./serialization"));
var createPlugins = ramda_1.compose(ramda_1.flatten, ramda_1.map(ramda_1.prop('plugins')));
exports.default = (function (plugins, translations) {
    if (plugins === void 0) { plugins = defaultPlugins_1.default; }
    if (translations === void 0) { translations = settings_1.defaultTranslations; }
    var settings = {};
    settings.plugins = (plugins ? plugins : []).concat(createPlugins(plugins));
    var serializeFunctions = serialization_1.default({ plugins: plugins });
    var HoverButtons = function (_a) {
        var editorState = _a.editorState, editor = _a.editor;
        return (React.createElement("div", null, plugins &&
            plugins.map(function (plugin, i) {
                return plugin.hoverButtons &&
                    plugin.hoverButtons.map(function (Button, j) { return (React.createElement(Button, { translations: translations, key: i + "-" + j, editorState: editorState, editor: editor })); });
            })));
    };
    settings.HoverButtons = HoverButtons;
    var ToolbarButtons = function (_a) {
        var editorState = _a.editorState, editor = _a.editor;
        return (React.createElement("div", null, plugins &&
            plugins.map(function (plugin, i) {
                return plugin.toolbarButtons &&
                    plugin.toolbarButtons.map(function (Button, j) { return (React.createElement(Button, { translations: translations, key: i + "-" + j, editorState: editorState, editor: editor })); });
            })));
    };
    settings.ToolbarButtons = ToolbarButtons;
    var mergedSettings = __assign({}, settings_1.defaultSettings, settings);
    var Slate = function (cellProps) { return (React.createElement(Component_1.default, __assign({}, cellProps, mergedSettings, { serializeFunctions: serializeFunctions }))); };
    return {
        Component: Slate,
        StaticComponent: function (props) { return React.createElement(StaticComponent_1.default, __assign({}, props, { plugins: plugins })); },
        name: 'ory/editor/core/content/slate',
        version: '0.0.2',
        IconComponent: React.createElement(Subject_1.default, null),
        text: mergedSettings.translations.pluginName,
        description: mergedSettings.translations.pluginDescription,
        allowInlineNeighbours: true,
        /*handleFocus: (_props: SlateProps, source: string) => {
          if (source === 'onMouseDown') {
            return;
          } else if (_props.state.editorState.selection.isFocused) {
            return;
          }
    
          setTimeout(() => {
            _props.state.editor && _props.state.editor.focus();
          }, 0);
        },
    
        handleBlur: (_props: SlateProps) => {
          if (!_props.state.editorState.selection.isFocused) {
            return;
          }
          _props.onChange({
            editorState: _props.state.editor && _props.state.editor.blur().value,
          });
        },*/
        // tslint:disable-next-line:no-any
        reducer: function (state, action) {
            if ((action.type === redux_undo_1.ActionTypes.UNDO ||
                action.type === redux_undo_1.ActionTypes.REDO) &&
                pathOr_1.pathOr(false, ['content', 'state', 'editorState'], state)) {
                return __assign({}, state, { content: __assign({}, state.content, { state: __assign({}, state.content.state, { editorState: state.content.state.editorState.merge({
                                isNative: false,
                            }) }) }) });
            }
            return state;
        },
        handleRemoveHotKey: hooks.handleRemoveHotKey,
        handleFocusPreviousHotKey: hooks.handleFocusPreviousHotKey,
        handleFocusNextHotKey: hooks.handleFocusNextHotKey,
        createInitialState: serializeFunctions.createInitialState,
        serialize: serializeFunctions.serialize,
        unserialize: serializeFunctions.unserialize,
        // TODO this is disabled because of #207
        // merge = hooks.merge
        // split = hooks.split
        migrations: [v002_1.default],
    };
});
//# sourceMappingURL=index.js.map