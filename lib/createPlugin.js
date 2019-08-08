"use strict";
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
var React = __importStar(require("react"));
var index_1 = __importDefault(require("./Component/index"));
var settings_1 = require("./default/settings");
var core_1 = require("@react-page/core");
var Panorama = core_1.lazyLoad(function () { return Promise.resolve().then(function () { return __importStar(require('@material-ui/icons/Panorama')); }); });
var createPlugin = function (settings) {
    var mergedSettings = __assign({}, settings_1.defaultSettings, settings);
    return {
        Component: function (props) { return (React.createElement(index_1.default, __assign({}, props, mergedSettings))); },
        name: 'ory/editor/core/content/image',
        version: '0.0.1',
        IconComponent: React.createElement(Panorama, null),
        text: mergedSettings.translations.pluginName,
        isInlineable: true,
        description: mergedSettings.translations.pluginDescription,
        handleRemoveHotKey: function (_, __) {
            return Promise.reject();
        },
        handleFocusPreviousHotKey: function (_, __) { return Promise.reject(); },
        handleFocusNextHotKey: function (_, __) {
            return Promise.reject();
        },
        // We need this because otherwise we lose hotkey focus on elements like spoilers.
        // This could probably be solved in an easier way by listening to window.document?
        // tslint:disable-next-line:no-any
        handleFocus: function (props, source, ref) {
            if (!ref) {
                return;
            }
            setTimeout(function () { return ref.focus(); });
        },
    };
};
exports.default = createPlugin;
//# sourceMappingURL=createPlugin.js.map