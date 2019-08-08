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
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no-any
var nodeInner = function (current, props) {
    var id = current.id, _a = current.rows, rows = _a === void 0 ? [] : _a, _b = current.cells, cells = _b === void 0 ? [] : _b;
    if (id === props.id) {
        return current;
    }
    var found = undefined;
    // tslint:disable-next-line:no-any
    rows.concat(cells).find(function (n) {
        var f = nodeInner(n, props);
        if (f) {
            found = f;
        }
        return Boolean(f);
    });
    return found;
};
exports.editable = function (state, _a) {
    var id = _a.id;
    return state &&
        state.reactPage &&
        state.reactPage.editables &&
        state.reactPage.editables.present.find(function (_a) {
            var current = (_a === void 0 ? {} : _a).id;
            return current === id;
        });
};
exports.editables = function (_a) {
    var present = _a.reactPage.editables.present;
    return present;
};
exports.purifiedEditable = function (state, props) {
    var found = exports.editable(state, props);
    if (!found) {
        return null;
    }
    return __assign({}, found, { cells: (found.cells || []).map(function (c) {
            return typeof c === 'string' ? c : c.id;
        }) });
};
exports.editableConfig = function (state, _a) {
    var id = _a.editable;
    return exports.editable(state, { id: id }).config;
};
exports.node = function (state, props
// tslint:disable-next-line:no-any
) {
    var tree = exports.editable(state, { id: props.editable });
    if (!tree) {
        throw new Error("Could not find editable: " + props.editable);
    }
    return __assign({}, nodeInner(tree, props));
};
exports.searchNodeEverywhere = function (state, id) {
    for (var i = 0; i < state.reactPage.editables.present.length; i++) {
        var n = exports.node(state, { id: id, editable: state.reactPage.editables.present[i].id });
        if (n.id) {
            return {
                node: n,
                editable: state.reactPage.editables.present[i],
            };
        }
    }
    return null;
};
exports.purifiedNode = function (state, props) {
    var found = exports.node(state, props);
    if (!found) {
        return null;
    }
    if (found.cells) {
        found.cells = found.cells.map(function (c) { return c.id; }
        // tslint:disable-next-line:no-any
        );
    }
    if (found.rows) {
        found.rows = found.rows.map(function (r) { return r.id; }
        // tslint:disable-next-line:no-any
        );
    }
    return found;
};
//# sourceMappingURL=index.js.map