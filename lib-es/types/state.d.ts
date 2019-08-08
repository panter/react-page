import { Editables } from './editable';
import { Display } from './display';
export declare type RootState = {
    reactPage: {
        editables: Editables;
        display: Display;
        focus: string;
        settings: {
            [key: string]: any;
        };
    };
};
//# sourceMappingURL=state.d.ts.map