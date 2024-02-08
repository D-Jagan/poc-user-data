"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hello = void 0;
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/v1', routes_1.default);
const port = 5001;
app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`);
});
const world = 'world';
function hello(who = world) {
    console.log("hellooooo");
    return `Hello ${who}! `;
}
exports.hello = hello;
hello("jagan");
