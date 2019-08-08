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
var React = __importStar(require("react"));
var react_resizable_1 = require("react-resizable");
var ui_1 = require("@react-page/ui");
var ThemeProvider_1 = require("@react-page/ui/lib/ThemeProvider");
var state_1 = require("./../default/state");
var classnames_1 = __importDefault(require("classnames"));
var TextField_1 = __importDefault(require("@material-ui/core/TextField"));
var faintBlack = 'rgba(0, 0, 0, 0.12)';
var SpacerDefaultControls = function (props) {
    var isPreviewMode = props.isPreviewMode, isEditMode = props.isEditMode, focused = props.focused, Renderer = props.Renderer, changeHeightPreview = props.changeHeightPreview, commitHeight = props.commitHeight, _a = props.state, height = (_a === void 0 ? state_1.defaultSpacerState : _a).height;
    return (React.createElement("div", { style: { border: 'solid 1px', borderColor: faintBlack }, className: classnames_1.default('ory-plugins-content-spacer', {
            'ory-plugins-content-spacer-read-only': isPreviewMode,
        }) }, !isEditMode ? (React.createElement(Renderer, __assign({}, props))) : (React.createElement(react_resizable_1.Resizable, { onResize: function (e, data) { return changeHeightPreview(data.size.height); }, onResizeStop: function (e, data) { return commitHeight(data.size.height); }, height: height, width: 0 },
        React.createElement("div", { style: { height: height, position: 'relative' } },
            React.createElement(ui_1.BottomToolbar, { open: focused, theme: ThemeProvider_1.darkTheme },
                React.createElement(TextField_1.default, { placeholder: "24", label: props.translations.elementHeightLabel, style: { width: '512px' }, value: height, onChange: function (e) {
                        return changeHeightPreview(parseInt(e.target.value, 10));
                    }, onBlur: function () { return commitHeight(); }, color: "white", type: "number" })),
            React.createElement("div", { style: {
                    position: 'absolute',
                    bottom: '0',
                    height: '24px',
                    width: '100%',
                    background: faintBlack,
                    textAlign: 'center',
                } },
                React.createElement("svg", { viewBox: "0 0 24 24", style: { color: 'white', width: 24, height: 24 } },
                    React.createElement("path", { d: "M20 9H4v2h16V9zM4 15h16v-2H4v2z" }))))))));
};
exports.default = SpacerDefaultControls;
//# sourceMappingURL=SpacerDefaultControls.js.map