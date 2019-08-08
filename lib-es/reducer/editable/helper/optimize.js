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
import { emptyFilter } from './empty';
export const flatten = function (c, n) {
    return [...c, ...n];
};
export const optimizeCells = (cells = []) => cells.filter(emptyFilter);
export const optimizeRows = (rows = []) => rows.filter(emptyFilter);
export const optimizeCell = (_a) => {
    var { rows } = _a, other = __rest(_a, ["rows"]);
    return (Object.assign({}, other, { rows: (rows || [])
            .map((r) => {
            const { cells = [] } = r;
            if (cells.length !== 1) {
                return [r];
            }
            const { rows: cellRows = [], layout } = cells[0];
            if (cellRows.length > 0 && !layout) {
                return cellRows;
            }
            return [r];
        })
            .reduce(flatten, []) }));
};
export const optimizeRow = (_a) => {
    var { cells } = _a, other = __rest(_a, ["cells"]);
    return (Object.assign({}, other, { cells: (cells || [])
            .map((c) => {
            const { rows = [] } = c;
            if (rows.length !== 1 || c.layout) {
                return [c];
            }
            const { cells: rowCells = [] } = rows[0];
            if (rowCells.length === 1) {
                return rowCells;
            }
            return [c];
        })
            .reduce(flatten, []) }));
};
//# sourceMappingURL=optimize.js.map