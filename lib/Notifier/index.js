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
var React = __importStar(require("react"));
var Snackbar_1 = __importDefault(require("@material-ui/core/Snackbar"));
var react_redux_1 = require("react-redux");
var reselect_1 = require("reselect");
var setting_1 = require("@react-page/core/lib/actions/setting");
var setting_2 = require("@react-page/core/lib/selector/setting");
var i18n_1 = __importDefault(require("@react-page/core/lib/service/i18n"));
exports.dismissedMobilePreviewKey = 'mobile-preview-dismissed';
var handleDismiss = function (_updateSetting, id) { return function () { return setting_1.updateSetting("notifier." + id, true); }; };
var Notifier = function (props) { return (React.createElement(Snackbar_1.default, { open: props.open && !props.dismissed, action: props.action, message: i18n_1.default.t(props.message), onClose: handleDismiss(props.updateSetting, props.id) })); };
var mapStateToProps = reselect_1.createStructuredSelector({
    dismissed: function (state, props) {
        return setting_2.getSetting("notifier." + props.id)(state);
    },
});
var mapActionsToProps = {
    updateSetting: setting_1.updateSetting,
};
exports.default = react_redux_1.connect(mapStateToProps, mapActionsToProps)(Notifier);
//# sourceMappingURL=index.js.map