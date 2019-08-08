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
var Droppable_1 = __importDefault(require("../Droppable"));
var Draggable_1 = __importDefault(require("../Draggable"));
var Rows_1 = __importDefault(require("../Rows"));
var Layout_1 = __importDefault(require("../Layout"));
var Content_1 = __importDefault(require("../Content"));
var Empty_1 = __importDefault(require("../Empty"));
var Inner = /** @class */ (function (_super) {
    __extends(Inner, _super);
    function Inner() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Inner.prototype.render = function () {
        var _a = this.props, _b = _a.node, _c = _b.rows, rows = _c === void 0 ? [] : _c, _d = _b.layout, _e = (_d === void 0 ? {} : _d).plugin, _f = _e === void 0 ? {} : _e, _g = _f.Component, LayoutComponent = _g === void 0 ? undefined : _g, _h = _f.name, layoutType = _h === void 0 ? undefined : _h, _j = _f.text, layoutTitle = _j === void 0 ? undefined : _j, _k = _b.content, _l = (_k === void 0 ? {} : _k).plugin, _m = _l === void 0 ? {} : _l, _o = _m.Component, ContentComponent = _o === void 0 ? undefined : _o, _p = _m.name, contentType = _p === void 0 ? undefined : _p, _q = _m.text, contentTitle = _q === void 0 ? undefined : _q, _r = _a.config.whitelist, whitelist = _r === void 0 ? [] : _r;
        if (rows.length && LayoutComponent) {
            return (React.createElement(Droppable_1.default, __assign({}, this.props, { dropTypes: whitelist }),
                React.createElement(Draggable_1.default, __assign({}, this.props, { dragType: layoutType, name: layoutTitle || layoutType }),
                    React.createElement(Layout_1.default, __assign({}, this.props)))));
        }
        else if (rows.length) {
            return (React.createElement(Droppable_1.default, __assign({}, this.props, { dropTypes: whitelist }),
                React.createElement(Rows_1.default, __assign({}, this.props))));
        }
        else if (ContentComponent) {
            return (React.createElement(Droppable_1.default, __assign({}, this.props, { isLeaf: true, dropTypes: whitelist }),
                React.createElement(Draggable_1.default, __assign({}, this.props, { isLeaf: true, dragType: contentType, name: contentTitle || contentType }),
                    React.createElement(Content_1.default, __assign({}, this.props)))));
        }
        return React.createElement(Empty_1.default, __assign({}, this.props));
    };
    return Inner;
}(React.PureComponent));
exports.default = Inner;
//# sourceMappingURL=index.js.map