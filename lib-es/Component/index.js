import * as React from 'react';
// tslint:disable-next-line:no-any
export default (props) => {
    const { Controls, Renderer, readOnly } = props;
    // slate controls currently contain everything
    return React.createElement(React.Fragment, null, !readOnly ? React.createElement(Controls, Object.assign({}, props)) : React.createElement(Renderer, Object.assign({}, props)));
};
//# sourceMappingURL=index.js.map