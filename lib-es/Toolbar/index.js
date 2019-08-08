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
import Drawer from '@material-ui/core/Drawer';
import { connect } from 'react-redux';
import { isInsertMode } from '@react-page/core/lib/selector/display';
import { createStructuredSelector } from 'reselect';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import TextField from '@material-ui/core/TextField';
import Item from './Item/index';
import Provider from '../Provider/index';
const defaultTranslations = {
    noPluginFoundContent: 'No plugins found',
    searchPlaceholder: 'Search plugins',
    layoutPlugins: 'Layout plugins',
    contentPlugins: 'Content plugins',
    insertPlugin: 'Add plugin to content',
    dragMe: 'Drag me!',
};
class Raw extends React.Component {
    constructor(props) {
        super(props);
        this.onRef = component => {
            this.input = component;
        };
        this.onSearch = e => {
            const target = e.target;
            if (target instanceof HTMLInputElement) {
                this.setState({
                    isSearching: target.value.length > 0,
                    searchText: target.value,
                });
            }
        };
        this.state = {
            isSearching: false,
            searchText: '',
        };
        this.onSearch = this.onSearch.bind(this);
        this.searchFilter = this.searchFilter.bind(this);
    }
    componentDidUpdate() {
        const input = this.input;
        if (input && this.props.isInsertMode && input instanceof HTMLElement) {
            setTimeout(() => {
                const e = input.querySelector('input');
                if (e) {
                    e.focus();
                }
            }, 100);
        }
    }
    searchFilter(plugin) {
        return (plugin &&
            plugin.name &&
            plugin.name.toLowerCase().startsWith(this.state.searchText.toLowerCase()));
    }
    render() {
        const { editor: { plugins }, } = this.props;
        const content = plugins.plugins.content.filter(this.searchFilter);
        const layout = plugins.plugins.layout.filter(this.searchFilter);
        return (React.createElement(Drawer, { variant: "persistent", className: "ory-toolbar-drawer", open: this.props.isInsertMode },
            React.createElement(List, { subheader: React.createElement(ListSubheader, null, this.props.translations.insertPlugin) },
                React.createElement(ListItem, null,
                    React.createElement(TextField, { inputRef: this.onRef, placeholder: this.props.translations.searchPlaceholder, fullWidth: true, onChange: this.onSearch })),
                layout.length + content.length === 0 && (React.createElement(ListSubheader, null, this.props.translations.noPluginFoundContent))),
            content.length > 0 && (React.createElement(List, { subheader: React.createElement(ListSubheader, null, this.props.translations.contentPlugins) }, content.map((plugin, k) => {
                const initialState = plugin.createInitialState();
                return (React.createElement(Item, { translations: this.props.translations, plugin: plugin, key: k.toString(), insert: {
                        content: {
                            plugin,
                            state: initialState,
                        },
                    } }));
            }))),
            layout.length > 0 && (React.createElement(List, { subheader: React.createElement(ListSubheader, null, this.props.translations.layoutPlugins) }, layout.map((plugin, k) => {
                const initialState = plugin.createInitialState();
                const children = plugin.createInitialChildren();
                return (React.createElement(Item, { translations: this.props.translations, plugin: plugin, key: k.toString(), insert: Object.assign({}, children, { layout: {
                            plugin,
                            state: initialState,
                        } }) }));
            })))));
    }
}
Raw.defaultProps = {
    translations: defaultTranslations,
};
const mapStateToProps = createStructuredSelector({ isInsertMode });
const Decorated = connect(mapStateToProps)(Raw);
const Toolbar = props => (React.createElement(Provider, Object.assign({}, props),
    React.createElement(Decorated, Object.assign({}, props))));
export default Toolbar;
//# sourceMappingURL=index.js.map