"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var alignment_1 = __importDefault(require("./alignment"));
var blockquote_1 = __importDefault(require("./blockquote"));
var index_1 = __importDefault(require("./code/index"));
var emphasize_1 = __importDefault(require("./emphasize"));
var headings_1 = __importDefault(require("./headings"));
var index_2 = __importDefault(require("./link/index"));
var lists_1 = __importDefault(require("./lists"));
var paragraph_1 = __importDefault(require("./paragraph"));
var defaultPlugins = [
    new paragraph_1.default(),
    new emphasize_1.default(),
    new headings_1.default(),
    new index_2.default(),
    new index_1.default(),
    new lists_1.default(),
    new blockquote_1.default(),
    new alignment_1.default(),
];
exports.default = defaultPlugins;
//# sourceMappingURL=defaultPlugins.js.map