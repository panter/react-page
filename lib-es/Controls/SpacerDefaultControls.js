import * as React from 'react';
import { Resizable } from 'react-resizable';
import { BottomToolbar } from '@react-page/ui';
import { darkTheme } from '@react-page/ui/lib/ThemeProvider';
import { defaultSpacerState } from './../default/state';
import classNames from 'classnames';
import TextField from '@material-ui/core/TextField';
const faintBlack = 'rgba(0, 0, 0, 0.12)';
const SpacerDefaultControls = props => {
    const { isPreviewMode, isEditMode, focused, Renderer, changeHeightPreview, commitHeight, state: { height } = defaultSpacerState, } = props;
    return (React.createElement("div", { style: { border: 'solid 1px', borderColor: faintBlack }, className: classNames('ory-plugins-content-spacer', {
            'ory-plugins-content-spacer-read-only': isPreviewMode,
        }) }, !isEditMode ? (React.createElement(Renderer, Object.assign({}, props))) : (React.createElement(Resizable, { onResize: (e, data) => changeHeightPreview(data.size.height), onResizeStop: (e, data) => commitHeight(data.size.height), height: height, width: 0 },
        React.createElement("div", { style: { height, position: 'relative' } },
            React.createElement(BottomToolbar, { open: focused, theme: darkTheme },
                React.createElement(TextField, { placeholder: "24", label: props.translations.elementHeightLabel, style: { width: '512px' }, value: height, onChange: e => changeHeightPreview(parseInt(e.target.value, 10)), onBlur: () => commitHeight(), color: "white", type: "number" })),
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
export default SpacerDefaultControls;
//# sourceMappingURL=SpacerDefaultControls.js.map