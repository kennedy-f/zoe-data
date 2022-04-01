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
import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import { AxiosConfigContext } from "./AxiosConfigContext";
export function ApiConfigProvider(_a) {
    var children = _a.children, axiosConfigParams = _a.axiosConfigParams;
    var _b = useState(""), apiUrl = _b[0], setApiUrl = _b[1];
    var _c = useState(__assign({}, axiosConfigParams)), axiosConfig = _c[0], setAxiosConfig = _c[1];
    var _d = useState(""), authToken = _d[0], setAuthToken = _d[1];
    var _e = useState("Authorization"), authTokenName = _e[0], setAuthTokenName = _e[1];
    var setToken = function (token) {
        var _a;
        setAuthToken(token);
        setAxiosConfig(__assign(__assign({}, axiosConfig), { headers: __assign(__assign({}, axiosConfig.headers), (_a = {}, _a[authTokenName] = token, _a)) }));
    };
    var setTokenName = function (tokenName) {
        setAuthTokenName(tokenName);
    };
    return (_jsx(AxiosConfigContext.Provider, __assign({ value: {
            setApiUrl: setApiUrl,
            apiUrl: apiUrl,
            axiosConfig: axiosConfig,
            setAxiosConfig: setAxiosConfig,
            setToken: setToken,
            setTokenName: setTokenName,
            tokenName: authTokenName,
            token: authToken,
        } }, { children: children })));
}
//# sourceMappingURL=ApiConfig.provider.js.map