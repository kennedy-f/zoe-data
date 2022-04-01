export var GenerateUrlWithId = function (id, url, customUrl) {
    if (customUrl === void 0) { customUrl = ""; }
    if (customUrl) {
        return customUrl.replace(/\$id/g, id.toString());
    }
    return "".concat(url, "/").concat(id);
};
//# sourceMappingURL=generate-url-with-id.js.map