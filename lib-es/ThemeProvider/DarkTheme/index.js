import { createMuiTheme } from '@material-ui/core/styles';
import { themeOptions } from '../themeOptions';
const theme = createMuiTheme(Object.assign({}, themeOptions, { palette: Object.assign({}, (themeOptions && themeOptions.palette), { type: 'dark' }), typography: {
        useNextVariants: true,
    } }));
export default theme;
//# sourceMappingURL=index.js.map