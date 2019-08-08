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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
const computeRowLevels = (a, b) => {
    const { cells = [] } = a, props = __rest(a, ["cells"]);
    const { left = 0, right = 0, above = 0, below = 0 } = b || {};
    let newCells = [];
    if (cells.length) {
        newCells = cells.map((c, k) => computeCellLevels(c, {
            left: k === 0 ? left + 1 : 0,
            right: k === cells.length - 1 ? right + 1 : 0,
            above: above + 1,
            below: below + 1,
        }));
    }
    delete props.levels;
    return Object.assign({ levels: { left, right, above, below } }, props, { cells: newCells });
};
const computeCellLevels = (a, b) => {
    const { rows = [] } = a, props = __rest(a, ["rows"]);
    const { left = 0, right = 0, above = 0, below = 0 } = b || {};
    let newRows;
    if (rows.length) {
        newRows = rows.map((r, k) => computeRowLevels(r, {
            left: left + 1,
            right: right + 1,
            above: k === 0 ? above + 1 : 0,
            below: k === rows.length - 1 ? below + 1 : 0,
        }));
    }
    delete props.levels; // eslint-disable-line prefer-reflect
    return Object.assign({ levels: { left, right, above, below } }, props, { rows: newRows });
};
export const computeDropLevels = (c) => computeCellLevels(c);
//# sourceMappingURL=level.js.map