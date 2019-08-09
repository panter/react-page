import AlignmentPlugin from './alignment';
import BlockquotePlugin from './blockquote';
import CodePlugin from './code/index';
import EmphasizePlugin from './emphasize';
import HeadingsPlugin from './headings';
import LinkPlugin from './link/index';
import ListsPlugin from './lists';
import ParagraphPlugin from './paragraph';
const defaultPlugins = [
    new ParagraphPlugin(),
    new EmphasizePlugin(),
    new HeadingsPlugin(),
    new LinkPlugin(),
    new CodePlugin(),
    new ListsPlugin(),
    new BlockquotePlugin(),
    new AlignmentPlugin(),
];
export default defaultPlugins;
//# sourceMappingURL=defaultPlugins.js.map