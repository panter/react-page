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
/* eslint-disable no-alert, prefer-reflect, default-case, react/display-name */
import LinkIcon from '@material-ui/icons/Link';
import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { ToolbarButton } from '../../helpers';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@react-page/ui';
const A = 'LINK/LINK';
class LinkButton extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            open: false,
            href: '',
            title: '',
            hadLinks: false,
            wasExpanded: false,
        };
        this.onRef = (component) => {
            if (!component && true) {
                return null;
            }
            const e = component.querySelector('input');
            if (e) {
                e.focus();
            }
        };
        this.onClick = e => {
            const { editorState, editor } = this.props;
            e.preventDefault();
            const hasLinks = editorState.inlines.some((inline) => inline.type === A);
            if (hasLinks) {
                editor.unwrapInline(A);
            }
            else if (editorState.selection.isExpanded) {
                this.setState({
                    open: true,
                    wasExpanded: editorState.selection.isExpanded,
                    href: '',
                    title: '',
                    hadLinks: hasLinks,
                });
            }
            else {
                this.setState({
                    open: true,
                    wasExpanded: editorState.selection.isExpanded,
                    href: '',
                    title: '',
                    hadLinks: hasLinks,
                });
            }
        };
        this.handleClose = () => {
            this.setState({ open: false });
            this.props.editor.focus();
        };
        this.handleSubmit = () => {
            this.setState({ open: false });
            if (!this.state.href) {
                this.handleClose();
                return;
            }
            if (this.state.wasExpanded) {
                this.props.editor
                    .focus()
                    .wrapInline({
                    type: A,
                    data: { href: this.state.href },
                })
                    .moveToEnd();
                return;
            }
            if (!this.state.title) {
                this.handleClose();
                return;
            }
            this.props.editor
                .insertText(this.state.title)
                .moveFocusBackward(this.state.title.length)
                .wrapInline({
                type: A,
                data: { href: this.state.href },
            })
                .moveToEnd()
                .focus();
        };
        this.onHrefChange = e => {
            this.setState({ href: e.target.value });
        };
        this.onTitleChange = e => {
            this.setState({ title: e.target.value });
        };
    }
    render() {
        const actions = (React.createElement(React.Fragment, null,
            React.createElement(Button, { variant: "text", color: "primary", onClick: this.handleClose }, this.props.translations.linkPlugin.cancel),
            React.createElement(Button, { variant: "text", color: "primary", onClick: this.handleSubmit }, this.props.translations.linkPlugin.ok)));
        const { editorState } = this.props;
        const hasLinks = editorState.inlines.some((inline) => inline.type === A);
        return (React.createElement(ThemeProvider, null,
            React.createElement("span", null,
                React.createElement(ToolbarButton, { onClick: this.onClick, isActive: hasLinks, icon: React.createElement(LinkIcon, null) }),
                React.createElement("span", null,
                    React.createElement(Dialog, { className: "ory-prevent-blur", title: this.props.translations.linkPlugin.createLink, 
                        // modal={false}
                        open: this.state.open },
                        React.createElement(DialogTitle, { id: "confirmation-dialog-title" }, this.props.translations.linkPlugin.createLink),
                        React.createElement(DialogContent, null,
                            this.state.wasExpanded ? null : (React.createElement("div", null,
                                React.createElement(TextField, { placeholder: this.props.translations.linkPlugin.linkTitlePlaceholder, onChange: this.onTitleChange, value: this.state.title }))),
                            React.createElement("div", { ref: this.onRef },
                                React.createElement(TextField, { placeholder: this.props.translations.linkPlugin.linkHrefPlaceholder, onChange: this.onHrefChange, value: this.state.href }))),
                        React.createElement(DialogActions, null, actions))))));
    }
}
export default LinkButton;
//# sourceMappingURL=LinkButton.js.map