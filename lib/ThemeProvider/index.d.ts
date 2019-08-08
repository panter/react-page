import * as React from 'react';
import { Theme } from '@material-ui/core/styles';
import darkTheme from './DarkTheme/index';
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
export { darkTheme };
export declare const themeOptions: ThemeOptions;
export interface ThemeProviderProps {
    theme?: Theme;
}
declare class ThemeProvider extends React.Component<ThemeProviderProps> {
    render(): JSX.Element;
}
export default ThemeProvider;
//# sourceMappingURL=index.d.ts.map