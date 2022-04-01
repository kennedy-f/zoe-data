import { createContext, useContext } from "react";
export var AxiosConfigContext = createContext({
    apiUrl: "",
    setApiUrl: function () { return null; },
    setToken: function () { return null; },
    token: "",
    tokenName: "",
    setTokenName: function () { return null; },
    axiosConfig: {},
    setAxiosConfig: function () { return null; },
});
export var useAxiosConfig = function () { return useContext(AxiosConfigContext); };
//# sourceMappingURL=AxiosConfigContext.js.map