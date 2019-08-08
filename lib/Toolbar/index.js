"use strict";
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
var React = __importStar(require("react"));
var Drawer_1 = __importDefault(require("@material-ui/core/Drawer"));
var react_redux_1 = require("react-redux");
var display_1 = require("@react-page/core/lib/selector/display");
var reselect_1 = require("reselect");
var List_1 = __importDefault(require("@material-ui/core/List"));
var ListItem_1 = __importDefault(require("@material-ui/core/ListItem"));
var ListSubheader_1 = __importDefault(require("@material-ui/core/ListSubheader"));
var TextField_1 = __importDefault(require("@material-ui/core/TextField"));
var index_1 = __importDefault(require("./Item/index"));
var index_2 = __importDefault(require("../Provider/index"));
var defaultTranslations = {
    noPluginFoundContent: 'No plugins found',
    searchPlaceholder: 'Search plugins',
    layoutPlugins: 'Layout plugins',
    contentPlugins: 'Content plugins',
    insertPlugin: 'Add plugin to content',
    dragMe: 'Drag me!',
};
var Raw = /** @class */ (function (_super) {
    __extends(Raw, _super);
    function Raw(props) {
        var _this = _super.call(this, props) || this;
        _this.onRef = function (component) {
            _this.input = component;
        };
        _this.onSearch = function (e) {
            var target = e.target;
            if (target instanceof HTMLInputElement) {
                _this.setState({
                    isSearching: target.value.length > 0,
                    searchText: target.value,
                });
            }
        };
        _this.state = {
            isSearching: false,
            searchText: '',
        };
        _this.onSearch = _this.onSearch.bind(_this);
        _this.searchFilter = _this.searchFilter.bind(_this);
        return _this;
    }
    Raw.prototype.componentDidUpdate = function () {
        var input = this.input;
        if (input && this.props.isInsertMode && input instanceof HTMLElement) {
            setTimeout(function () {
                var e = input.querySelector('input');
                if (e) {
                    e.focus();
                }
            }, 100);
        }
    };
    Raw.prototype.searchFilter = function (plugin) {
        return (plugin &&
            plugin.name &&
            plugin.name.toLowerCase().startsWith(this.state.searchText.toLowerCase()));
    };
    Raw.prototype.render = function () {
        var _this = this;
        var plugins = this.props.editor.plugins;
        var content = plugins.plugins.content.filter(this.searchFilter);
        var layout = plugins.plugins.layout.filter(this.searchFilter);
        return (React.createElement(Drawer_1.default, { variant: "persistent", className: "ory-toolbar-drawer", open: this.props.isInsertMode },
            React.createElement(List_1.default, { subheader: React.createElement(ListSubheader_1.default, null, this.props.translations.insertPlugin) },
                React.createElement(ListItem_1.default, null,
                    React.createElement(TextField_1.default, { inputRef: this.onRef, placeholder: this.props.translations.searchPlaceholder, fullWidth: true, onChange: this.onSearch })),
                layout.length + content.length === 0 && (React.createElement(ListSubheader_1.default, null, this.props.translations.noPluginFoundContent))),
            content.length > 0 && (React.createElement(List_1.default, { subheader: React.createElement(ListSubheader_1.default, null, this.props.translations.contentPlugins) }, content.map(function (plugin, k) {
                var initialState = plugin.createInitialState();
                return (React.createElement(index_1.default, { translations: _this.props.translations, plugin: plugin, key: k.toString(), insert: {
                        content: {
                            plugin: plugin,
                            state: initialState,
                        },
                    } }));
            }))),
            layout.length > 0 && (React.createElement(List_1.default, { subheader: React.createElement(ListSubheader_1.default, null, this.props.translations.layoutPlugins) }, layout.map(function (plugin, k) {
                var initialState = plugin.createInitialState();
                var children = plugin.createInitialChildren();
                return (React.createElement(index_1.default, { translations: _this.props.translations, plugin: plugin, key: k.toString(), insert: __assign({}, children, { layout: {
                            plugin: plugin,
                            state: initialState,
                        } }) }));
            })))));
    };
    Raw.defaultProps = {
        translations: defaultTranslations,
    };
    return Raw;
}(React.Component));
var mapStateToProps = reselect_1.createStructuredSelector({ isInsertMode: display_1.isInsertMode });
var Decorated = react_redux_1.connect(mapStateToProps)(Raw);
var Toolbar = function (props) { return (React.createElement(index_2.default, __assign({}, props),
    React.createElement(Decorated, __assign({}, props)))); };
exports.default = Toolbar;
//# sourceMappingURL=index.js.map