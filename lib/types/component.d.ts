import { ContentPluginProps } from '@react-page/core/lib/service/plugin/classes';
import { SlateState } from './state';
import { SlateSettings } from './settings';
import { SerializationFunctions } from 'src/serialization';
export declare type SlateProps = ContentPluginProps<SlateState> & SlateSettings & {
    serializeFunctions: SerializationFunctions;
};
//# sourceMappingURL=component.d.ts.map