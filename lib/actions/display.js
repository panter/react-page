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
exports.SET_DISPLAY_MODE = 'SET_DISPLAY_MODE';
exports.SET_PREVIOUS_DISPLAY_MODE = 'SET_PREVIOUS_DISPLAY_MODE';
exports.DISPLAY_MODE_PREVIEW = 'preview';
exports.DISPLAY_MODE_LAYOUT = 'layout';
exports.DISPLAY_MODE_EDIT = 'edit';
exports.DISPLAY_MODE_INSERT = 'insert';
exports.DISPLAY_MODE_RESIZING = 'resizing';
exports.DEFAULT_DISPLAY_MODE = exports.DISPLAY_MODE_PREVIEW;
var setDisplayMode = function (mode, remember) {
    if (remember === void 0) { remember = false; }
    return function () { return ({
        type: exports.SET_DISPLAY_MODE,
        ts: new Date(),
        mode: mode,
        remember: remember,
    }); };
};
/**
 * Dispatch to switch to insert display mode.
 */
exports.insertMode = setDisplayMode(exports.DISPLAY_MODE_INSERT);
/**
 * Dispatch to switch to edit display mode.
 */
exports.editMode = setDisplayMode(exports.DISPLAY_MODE_EDIT);
/**
 * Dispatch to switch to preview display mode.
 */
exports.previewMode = setDisplayMode(exports.DISPLAY_MODE_PREVIEW);
/**
 * Dispatch to switch to layout display mode.
 */
exports.layoutMode = setDisplayMode(exports.DISPLAY_MODE_LAYOUT);
/**
 * Dispatch to switch to resize display mode.
 */
exports.resizeMode = setDisplayMode(exports.DISPLAY_MODE_RESIZING);
/**
 * Dispatch to switch to the last display mode, or the fallback if reverting is not possible.
 */
exports.previousMode = function (fallback) { return ({
    type: exports.SET_PREVIOUS_DISPLAY_MODE,
    fallback: fallback,
}); };
//# sourceMappingURL=display.js.map