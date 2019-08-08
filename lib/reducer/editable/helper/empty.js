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
exports.isEmpty = function (_a) {
    var cells = _a.cells, rows = _a.rows, _b = _a.layout, _c = (_b === void 0 ? {} : _b).plugin, _d = (_c === void 0 ? {} : _c).name, layout = _d === void 0 ? undefined : _d, _e = _a.content, _f = (_e === void 0 ? {} : _e).plugin, _g = (_f === void 0 ? {} : _f).name, content = _g === void 0 ? undefined : _g;
    return !(cells || []).filter(exports.emptyFilter).length &&
        !(rows || []).filter(exports.emptyFilter).length &&
        !content &&
        !(layout && (rows || []).filter(exports.emptyFilter).length);
};
// tslint:disable-next-line:no-any
exports.emptyFilter = function (state) { return !exports.isEmpty(state); };
//# sourceMappingURL=empty.js.map