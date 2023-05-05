import AddVertexTool from './MainTools/AddVertexTool.js';
import MoveTool from './MainTools/MoveTool.js';
import AddEdgeTool from './MainTools/AddEdgeTool.js';
import DeleteTool from './MainTools/DeleteTool.js';
import ExportProjectTool from './ProjectTools/ExportProjectTool.js';
import ImportProjectTool from './ProjectTools/ImportProjectTool.js';
import BFSTool from './AlgorithmTools/BFSTool/BFSTool.js';

export const tools = {
    "move": MoveTool,
    "add_vertex": AddVertexTool,
    "add_edge": AddEdgeTool,
    "delete": DeleteTool,
    "export_project": ExportProjectTool,
    "import_project": ImportProjectTool,
    "bfs": BFSTool
}
