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
var sizing_1 = require("./sizing");
var optimize_1 = require("./optimize");
var level_1 = require("./level");
exports.decorate = function (cells) {
    if (cells === void 0) { cells = []; }
    return sizing_1.computeInlines(sizing_1.computeResizeable(sizing_1.computeBounds(sizing_1.computeSizes(optimize_1.optimizeCells(cells))))).map(function (cell) {
        if (cell.rows) {
            cell.rows = optimize_1.optimizeRows(cell.rows).map(function (r) {
                var optimized = optimize_1.optimizeRow(r);
                if (optimized.cells) {
                    optimized.cells = exports.decorate(optimized.cells);
                }
                return optimized;
            });
        }
        return level_1.computeDropLevels(optimize_1.optimizeCell(cell));
    });
};
//# sourceMappingURL=tree.js.map