"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var alignment_1 = __importDefault(require("./alignment"));
exports.AlignmentPlugin = alignment_1.default;
var blockquote_1 = __importDefault(require("./blockquote"));
exports.BlockquotePlugin = blockquote_1.default;
var index_1 = __importDefault(require("./code/index"));
exports.CodePlugin = index_1.default;
var emphasize_1 = __importDefault(require("./emphasize"));
exports.EmphasizePlugin = emphasize_1.default;
var headings_1 = __importDefault(require("./headings"));
exports.HeadingsPlugin = headings_1.default;
var index_2 = __importDefault(require("./link/index"));
exports.LinkPlugin = index_2.default;
var lists_1 = __importDefault(require("./lists"));
exports.ListsPlugin = lists_1.default;
var index_3 = __importDefault(require("./paragraph/index"));
exports.ParagraphPlugin = index_3.default;
//# sourceMappingURL=index.js.map