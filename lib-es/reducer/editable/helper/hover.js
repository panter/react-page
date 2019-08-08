/**
 * Check if this item is currently being hovered.
 */
export const isHoveringThis = (state = {}, action) => {
    const { level = 0, hover = null } = action;
    const children = state.rows || state.cells || [];
    if (level > 0) {
        return Boolean(children.find(child => isHoveringThis(child, Object.assign({}, action, { level: level - 1 }))));
    }
    return hover === state.id;
};
//# sourceMappingURL=hover.js.map