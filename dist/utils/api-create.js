var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import axios from "axios";
export function ApiCreate(originalApiConfig, overrideOriginalApiConfig) {
    return axios.create(__assign(__assign({}, originalApiConfig), overrideOriginalApiConfig));
}
//# sourceMappingURL=api-create.js.map