import Plugin from './Plugin';
import { SlatePluginSettings } from './../types/plugin';
export interface AlignmentPluginSettings extends SlatePluginSettings {
    DEFAULT_NODE?: string;
}
export default class AlignmentPlugin extends Plugin {
    name: string;
    constructor(props?: AlignmentPluginSettings);
}
//# sourceMappingURL=alignment.d.ts.map