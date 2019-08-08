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
var Avatar_1 = __importDefault(require("@material-ui/core/Avatar"));
var index_1 = __importDefault(require("../Draggable/index"));
var ListItem_1 = __importDefault(require("@material-ui/core/ListItem"));
var ListItemText_1 = __importDefault(require("@material-ui/core/ListItemText"));
var DragHandle_1 = __importDefault(require("@material-ui/icons/DragHandle"));
var rc_tooltip_1 = __importDefault(require("rc-tooltip"));
var Item = /** @class */ (function (_super) {
    __extends(Item, _super);
    function Item(props) {
        var _this = _super.call(this, props) || this;
        _this.onMouseEnter = function () {
            _this.setState({ tooltipVisible: true });
        };
        _this.onMouseLeave = function () {
            _this.setState({ tooltipVisible: false });
        };
        _this.state = {
            tooltipVisible: false,
        };
        return _this;
    }
    Item.prototype.render = function () {
        var _a = this.props, plugin = _a.plugin, insert = _a.insert;
        if (!plugin.IconComponent && !plugin.text) {
            // logger.warn('Plugin text or plugin icon missing', plugin)
            return null;
        }
        var Draggable = index_1.default(plugin.name);
        // not using css modules here because they don't work with svg icons
        return (React.createElement(ListItem_1.default, { className: "ory-toolbar-item" },
            React.createElement(Avatar_1.default, { children: plugin.IconComponent }),
            React.createElement(ListItemText_1.default, { primary: plugin.text, secondary: plugin.description }),
            React.createElement("span", { className: "ory-toolbar-item-drag-handle-button", onMouseEnter: this.onMouseEnter, onMouseLeave: this.onMouseLeave, onMouseDown: this.onMouseLeave },
                React.createElement(Draggable, { insert: insert },
                    React.createElement(rc_tooltip_1.default, { visible: this.state.tooltipVisible, placement: "bottomLeft", overlay: React.createElement("span", null, this.props.translations.dragMe) },
                        React.createElement(DragHandle_1.default, { className: "ory-toolbar-item-drag-handle" }))))));
    };
    return Item;
}(React.Component));
exports.default = Item;
//# sourceMappingURL=index.js.map