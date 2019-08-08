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
exports.computeStepWidth = function (_a) {
    var rowWidth = _a.rowWidth, steps = _a.steps;
    return Math.round(rowWidth / (steps || 12));
};
exports.widthToSize = function (_a, _b, result) {
    var stepWidth = _a.stepWidth, steps = _a.steps;
    var inline = _b.node.inline;
    var size = Math.round(result.width / stepWidth);
    if (inline === 'right') {
        size = steps - size;
    }
    if (size > steps) {
        size = steps;
    }
    else if (size < 1) {
        size = 1;
    }
    return size;
};
//# sourceMappingURL=helper.js.map