"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pick = (obj, keys) => {
    const picked = {};
    for (const key of keys) {
        if (key in obj) {
            picked[key] = obj[key];
        }
    }
    return picked;
};
exports.default = pick;
//# sourceMappingURL=pick.js.map