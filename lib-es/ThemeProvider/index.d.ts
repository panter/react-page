import * as React from 'react';
import { Theme } from '@material-ui/core/styles';
import darkTheme from './DarkTheme/index';
export { darkTheme };
export interface ThemeProviderProps {
    theme?: Theme;
}
declare class ThemeProvider extends React.Component<ThemeProviderProps> {
    render(): JSX.Element;
}
export default ThemeProvider;
//# sourceMappingURL=index.d.ts.map