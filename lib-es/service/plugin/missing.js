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
import * as React from 'react';
const ContentMissingComponent = (props) => (React.createElement("div", { style: {
        backgroundColor: 'red',
        padding: '8px',
        border: '1px solid black',
        margin: '2px',
        overflowX: 'scroll',
    } },
    "The requested content plugin could not be found.",
    React.createElement("pre", null, JSON.stringify(props, null, 2))));
export const contentMissing = (plugin) => (Object.assign({ Component: ContentMissingComponent }, plugin));
const LayoutMissingComponent = (_a) => {
    var { children } = _a, props = __rest(_a, ["children"]);
    return (React.createElement("div", null,
        React.createElement("div", { style: {
                backgroundColor: 'red',
                padding: '8px',
                border: '1px solid black',
                margin: '2px',
                overflowX: 'scroll',
            } },
            "The requested layout plugin could not be found.",
            React.createElement("pre", null, JSON.stringify(props, null, 2))),
        children));
};
export const layoutMissing = (plugin) => (Object.assign({ Component: LayoutMissingComponent }, plugin));
//# sourceMappingURL=missing.js.map