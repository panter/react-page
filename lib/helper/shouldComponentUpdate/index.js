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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var equals_1 = __importDefault(require("ramda/src/equals"));
exports.shouldPureComponentUpdate = function (next) {
    var _this = this;
    var filterFunctions = function (o) { return function (key) {
        return typeof o[key] !== 'function';
    }; };
    var prevKeys = Object.keys(next).filter(filterFunctions(next));
    // eslint-disable-next-line no-invalid-this
    var nextKeys = Object.keys(this.props).filter(filterFunctions(this.props));
    if (!equals_1.default(nextKeys, prevKeys)) {
        // console.log('Keys are mismatching', nextKeys, prevKeys)
        return true;
    }
    // eslint-disable-next-line no-invalid-this
    var changed = nextKeys.filter(function (key) { return !equals_1.default(next[key], _this.props[key]); });
    // if (changed.length > 0) {
    //   console.log('There have been at least one changed fields: ', changed.map((c) => ({
    //     key: c,
    //     now: this.props[c],
    //     next: next[c]
    //   })))
    // } else {
    //   console.log('No changes deteced, skipping render.')
    // }
    return changed.length > 0;
};
//# sourceMappingURL=index.js.map