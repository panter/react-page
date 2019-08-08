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
const handleChange = (onChange) => (e) => {
    if (e.target instanceof HTMLInputElement) {
        onChange({ value: e.target.value });
    }
};
const Default = ({ readOnly, state: { value }, onChange, }) => readOnly ? (React.createElement("div", null, value)) : (React.createElement("textarea", { style: { width: '100%' }, value: value, onChange: handleChange(onChange) }));
const _defaultContentPlugin = {
    Component: Default,
    name: 'ory/editor/core/default',
    version: '0.0.1',
    createInitialState: () => ({
        value: 'This is the default plugin from the core package. To replace it, set the "defaultPlugin" value in the editor config.',
    }),
};
export default _defaultContentPlugin;
//# sourceMappingURL=default.js.map