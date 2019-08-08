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
exports.createCell = function () { return ({
    id: '',
    rows: [],
    size: 12,
    hover: null,
    inline: null,
    focused: false,
    focusSource: '',
    resizable: false,
    bounds: { left: 0, right: 0 },
    hasInlineNeighbour: null,
    levels: {
        above: 0,
        below: 0,
        right: 0,
        left: 0,
    },
}); };
exports.createRow = function () { return ({
    id: '',
    hover: null,
    cells: [],
    hasInlineChildren: false,
}); };
//# sourceMappingURL=editable.js.map