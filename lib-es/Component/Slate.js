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
import { createMuiTheme } from '@material-ui/core/styles';
import * as React from 'react';
import { Portal } from 'react-portal';
import isHotkey from 'is-hotkey';
import { Editor, getEventTransfer } from 'slate-react';
import { BottomToolbar, ThemeProvider } from '@react-page/ui';
import debounce from 'lodash.debounce';
const theme = createMuiTheme({
    palette: {
        type: 'dark',
    },
    typography: {
        useNextVariants: true,
    },
});
class Slate extends React.Component {
    constructor(props) {
        super(props);
        this.componentDidMount = () => {
            this.updateToolbar();
        };
        this.flushState = () => {
            if (this.state.editorState) {
                this.props.onChange({ editorState: this.state.editorState });
            }
        };
        this.onStateChange = ({ value }) => {
            this.setState({
                editorState: value,
            }, () => {
                this.updateToolbar();
            });
            this.flushStateDebounced();
        };
        this.updateToolbar = () => {
            const editorState = this.getState();
            const toolbar = this.toolbar.current;
            if (!toolbar ||
                editorState.selection.isBlurred ||
                editorState.selection.isCollapsed) {
                return;
            }
            let s = window.getSelection();
            let oRange = s.getRangeAt(0); // get the text range
            let oRect = oRange.getBoundingClientRect();
            if (oRect) {
                const { left, top, width } = oRect;
                toolbar.style.opacity = '1';
                toolbar.style.top = `${top + window.scrollY - toolbar.offsetHeight}px`;
                toolbar.style.left = `${left +
                    window.scrollX -
                    toolbar.offsetWidth / 2 +
                    width / 2}px`;
            }
        };
        this.onPaste = (e, editor, next) => {
            const transfer = getEventTransfer(e);
            if (transfer.type !== 'html') {
                return next();
            }
            const { document } = this.props.serializeFunctions.htmlToSlate(
            // tslint:disable-next-line:no-any
            transfer.html);
            return editor.insertFragment(document);
        };
        this.onKeyDown = (e, editor, next) => {
            // we need to prevent slate from handling undo and redo
            if (isHotkey(['mod+z', 'mod+y'], e)) {
                this.setState({ editorState: undefined });
                return true;
            }
            if (isHotkey('shift+enter', e)) {
                e.preventDefault();
                editor.insertText('\n');
                return true;
            }
            return next();
        };
        this.state = {};
        this.editor = React.createRef();
        this.toolbar = React.createRef();
        this.flushStateDebounced = debounce(this.flushState, 1000, {
            leading: true,
            trailing: true,
            maxWait: 10000,
        });
    }
    getState() {
        return this.state.editorState !== undefined
            ? this.state.editorState
            : this.props.state.editorState;
    }
    render() {
        const { focused, readOnly, plugins, HoverButtons, ToolbarButtons, } = this.props;
        const editorState = this.getState();
        const isOpened = editorState.selection.isExpanded && editorState.selection.isFocused;
        return (React.createElement("div", null,
            focused && (React.createElement(Portal, null,
                React.createElement(ThemeProvider, { theme: theme },
                    React.createElement("div", { className: 'ory-prevent-blur ory-plugins-content-slate-inline-toolbar ' +
                            (isOpened
                                ? ''
                                : 'ory-plugins-content-slate-inline-toolbar--hidden'), style: { padding: 0 }, ref: this.toolbar },
                        React.createElement(HoverButtons, { translations: this.props.translations, editorState: editorState, editor: this.editor.current }))))),
            React.createElement(Editor, { ref: this.editor, onChange: this.onStateChange, onKeyDown: this.onKeyDown, readOnly: Boolean(readOnly), className: "ory-plugins-content-slate-container", 
                // onBlur={this.onBlur}
                // onFocus={this.onFocus}
                value: editorState, plugins: plugins, onPaste: this.onPaste, placeholder: this.props.translations.placeholder }),
            readOnly ? null : (React.createElement(BottomToolbar, { open: focused },
                React.createElement(ToolbarButtons, { translations: this.props.translations, editor: this.editor.current, editorState: editorState })))));
    }
}
export default Slate;
//# sourceMappingURL=Slate.js.map