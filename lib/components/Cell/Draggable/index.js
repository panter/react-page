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
var React = __importStar(require("react"));
var react_dnd_1 = require("react-dnd");
var react_redux_1 = require("react-redux");
var classnames_1 = __importDefault(require("classnames"));
var drag_1 = require("../../../actions/cell/drag");
var insert_1 = require("../../../actions/cell/insert");
var dnd_1 = require("./helper/dnd");
var icon = 
// tslint:disable-next-line:max-line-length
'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAhCAYAAACbffiEAAAA6UlEQVRYhe2ZQQ6CMBBFX0njHg7ESXTp1p3uvIBewc3Em3AfdelSFwRDCAm01JRO+pa0lP8zzc9kMCKyAa7AFqhIixdwB44WuACHuHq8KWm1vwtgF1lMCPaWkevUNE3Qr9R17XTu1P5uvUdV+IpbG2qMGBH5xBYRAjUVUWPEjj10SS3XRFry3kha/VBTETVGcmqtDTVGFqdWn7k9ku96f88QNRVRYySn1tpQY8QptXz7qinmnpt7rZTIqbU21BgJ2mv1+XfCDVFTETVGjIg8SG8KP+RZ0I7lU+dmgRNgaKfyZVw9znT/R85fOHJJE77U6UcAAAAASUVORK5CYII=';
var Draggable = /** @class */ (function (_super) {
    __extends(Draggable, _super);
    function Draggable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Draggable.prototype.componentDidMount = function () {
        var _this = this;
        var img = new Image();
        img.onload = function () { return _this.props.connectDragPreview(img); };
        img.src = icon;
    };
    Draggable.prototype.render = function () {
        var _a;
        var _b = this.props, isLeaf = _b.isLeaf, connectDragSource = _b.connectDragSource, isDragging = _b.isDragging, isLayoutMode = _b.isLayoutMode, inline = _b.node.inline, children = _b.children, name = _b.name;
        if (!isLayoutMode) {
            return (React.createElement("div", { className: "ory-cell-draggable-container" },
                React.createElement("div", { className: "ory-cell-draggable-overlay-placeholder" }),
                children));
        }
        return connectDragSource(React.createElement("div", { className: classnames_1.default('ory-cell-draggable', {
                'ory-cell-draggable-is-dragging': isDragging,
            }) },
            React.createElement("div", { className: classnames_1.default('ory-cell-draggable-overlay', (_a = {},
                    _a["ory-cell-draggable-inline-" + inline] = inline,
                    _a['ory-cell-draggable-leaf'] = isLeaf,
                    _a)) },
                React.createElement("div", { className: "ory-cell-draggable-overlay-description" },
                    React.createElement("span", null, name))),
            children));
    };
    return Draggable;
}(React.PureComponent));
var mapDispatchToProps = __assign({}, drag_1.dragActions, insert_1.insertActions);
exports.default = react_redux_1.connect(null, mapDispatchToProps)(react_dnd_1.DragSource(function (_a) {
    var dragType = _a.dragType;
    return dragType;
}, dnd_1.source, dnd_1.collect)(Draggable));
//# sourceMappingURL=index.js.map