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
var immutable_1 = require("immutable");
var head_1 = __importDefault(require("ramda/src/head"));
var map_1 = __importDefault(require("ramda/src/map"));
var path_1 = __importDefault(require("ramda/src/path"));
var reduce_1 = __importDefault(require("ramda/src/reduce"));
var tail_1 = __importDefault(require("ramda/src/tail"));
// FIXME #126
var slate_1 = require("slate");
var slate_plain_serializer_1 = __importDefault(require("slate-plain-serializer"));
exports.merge = function (states) {
    var nodes = map_1.default(path_1.default(['editorState', 'document', 'nodes']), states);
    var mergedNodes = reduce_1.default(
    // tslint:disable-next-line:no-any
    function (a, b) { return a.concat(b); }, head_1.default(nodes), tail_1.default(nodes));
    var mergedDocument = slate_1.Document.create({ nodes: mergedNodes });
    var mergedEditorState = slate_1.Value.create({ document: mergedDocument });
    return { editorState: mergedEditorState };
};
exports.split = function (state) {
    var nodes = path_1.default(['editorState', 'document', 'nodes'], state);
    return nodes
        ? nodes.toArray().map(function (node) {
            var splittedDocument = slate_1.Document.create({ nodes: immutable_1.List([node]) });
            var splittedEditorState = slate_1.Value.create({
                document: splittedDocument,
            });
            return { editorState: splittedEditorState };
        })
        : [];
};
// const position = (): {
//   top: ?number,
//   right: ?number,
//   left: ?number,
//   bottom: ?number
// } => {
//   if (window && window.getSelection) {
//     const selection = window.getSelection()
//     if (!selection.rangeCount) {
//       return {
//         top: null,
//         right: null,
//         left: null,
//         bottom: null,
//       }
//     }
//
//     return selection.getRangeAt(0).getBoundingClientRect()
//   }
//
//   if (window.document.selection) {
//     return window.document.selection
//       .createRange()
//       .getBoundingClientRect()
//   }
//
//   return {
//     top: null,
//     right: null,
//     left: null,
//     bottom: null,
//   }
// }
// if editor state is empty, remove cell when backspace or delete was pressed.
exports.handleRemoveHotKey = function (_, _a) {
    var editorState = _a.content.state.editorState;
    return new Promise(function (resolve, reject) {
        return slate_plain_serializer_1.default.serialize(editorState).length < 1 ? resolve() : reject();
    });
};
var windowSelectionWaitTime = 1;
exports.handleFocusPreviousHotKey = function (e, _a) {
    // const isArrowUp = e.keyCode === 38
    var editorState = _a.content.state.editorState;
    return new Promise(function (resolve, reject) {
        if (editorState.selection.isExpanded) {
            return reject();
        }
        setTimeout(function () {
            // if (isArrowUp && next.top === current.top) {
            //   return resolve()
            // } else
            if (editorState.selection.isCollapsed &&
                editorState.selection.anchor.isAtStartOfNode(editorState.document.nodes.first())) {
                return resolve();
            }
            reject();
        }, windowSelectionWaitTime);
    });
};
exports.handleFocusNextHotKey = function (e, _a) {
    // const isArrowDown = e.keyCode === 40
    var editorState = _a.content.state.editorState;
    return new Promise(function (resolve, reject) {
        if (editorState.selection.isExpanded) {
            return reject();
        }
        setTimeout(function () {
            // if (isArrowDown && next.top === current.top) {
            //   return resolve()
            // } else
            if (editorState.selection.isCollapsed &&
                editorState.selection.anchor.isAtEndOfNode(editorState.document.nodes.last())) {
                return resolve();
            }
            reject();
        }, windowSelectionWaitTime);
    });
};
//# sourceMappingURL=hooks.js.map