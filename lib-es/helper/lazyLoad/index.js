import * as React from 'react';
// we wrap the suspense directly atm
// tslint:disable-next-line:no-any
const withSuspense = (C) => (props) => (React.createElement(React.Suspense, { fallback: React.createElement("div", null) },
    React.createElement(C, Object.assign({}, props))));
// tslint:disable-next-line:no-any
export default (loader) => withSuspense(React.lazy(loader));
//# sourceMappingURL=index.js.map