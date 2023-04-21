import AddVertexTool from './AddVertexTool.js';
import MoveTool from './MoveTool.js';
import AddEdgeTool from './AddEdgeTool.js';
import DeleteTool from './DeleteTool.js';
import ExportProjectTool from './ExportProjectTool.js';
import ImportProjectTool from './ImportProjectTool.js';

export const tools = {
    "move": MoveTool,
    "add_vertex": AddVertexTool,
    "add_edge": AddEdgeTool,
    "delete": DeleteTool,
    "export_project": ExportProjectTool,
    "import_project": ImportProjectTool
}
