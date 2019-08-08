import * as React from 'react';
import { updateSetting } from '@react-page/core/lib/actions/setting';
export declare const dismissedMobilePreviewKey = "mobile-preview-dismissed";
export interface NotifierProps {
    dismissed: boolean;
    id: string;
    open: boolean;
    action: string;
    message: string;
    updateSetting: typeof updateSetting;
}
declare const _default: import("react-redux").ConnectedComponentClass<React.FunctionComponent<NotifierProps>, Pick<NotifierProps, "open" | "id" | "action" | "message">>;
export default _default;
//# sourceMappingURL=index.d.ts.map