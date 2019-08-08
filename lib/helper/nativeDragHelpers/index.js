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
Object.defineProperty(exports, "__esModule", { value: true });
var react_dnd_html5_backend_1 = require("react-dnd-html5-backend");
exports.isNativeHTMLElementDrag = function (monitor) {
    switch (monitor.getItemType()) {
        case react_dnd_html5_backend_1.NativeTypes.URL:
        case react_dnd_html5_backend_1.NativeTypes.FILE:
        case react_dnd_html5_backend_1.NativeTypes.TEXT:
            return true;
        default:
            return false;
    }
};
exports.createNativeCellReplacement = function () {
    var id = 'ory-native-drag';
    return {
        id: id,
        rawNode: function () { return ({ id: id }); },
        node: { content: { plugin: { isInlineable: false } } },
    };
};
//# sourceMappingURL=index.js.map