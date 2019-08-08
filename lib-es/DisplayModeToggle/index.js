var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
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
import * as React from 'react';
import Provider from '../Provider/index';
import ToggleEdit from './ToggleEdit/index';
import ToggleInsert from './ToggleInsert/index';
import ToggleLayout from './ToggleLayout/index';
import TogglePreview from './TogglePreview/index';
import ToggleResize from './ToggleResize/index';
const defaultTranslations = {
    edit: 'Edit things',
    insert: 'Add things',
    layout: 'Move things',
    resize: 'Resize things',
    preview: 'Preview result',
};
const Inner = (_a) => {
    var { translations = defaultTranslations } = _a, rest = __rest(_a, ["translations"]);
    return (React.createElement(Provider, Object.assign({}, rest),
        React.createElement("div", { className: "ory-controls-mode-toggle-control-group" },
            React.createElement("div", { className: "ory-controls-mode-toggle-control" },
                React.createElement(ToggleEdit, { label: translations.edit }),
                React.createElement("div", { className: "ory-controls-mode-toggle-clearfix" })),
            React.createElement("div", { className: "ory-controls-mode-toggle-control" },
                React.createElement(ToggleInsert, { label: translations.insert }),
                React.createElement("div", { className: "ory-controls-mode-toggle-clearfix" })),
            React.createElement("div", { className: "ory-controls-mode-toggle-control" },
                React.createElement(ToggleLayout, { label: translations.layout }),
                React.createElement("div", { className: "ory-controls-mode-toggle-clearfix" })),
            React.createElement("div", { className: "ory-controls-mode-toggle-control" },
                React.createElement(ToggleResize, { label: translations.resize }),
                React.createElement("div", { className: "ory-controls-mode-toggle-clearfix" })),
            React.createElement("div", { className: "ory-controls-mode-toggle-control" },
                React.createElement(TogglePreview, { label: translations.preview }),
                React.createElement("div", { className: "ory-controls-mode-toggle-clearfix" })))));
};
export default Inner;
//# sourceMappingURL=index.js.map