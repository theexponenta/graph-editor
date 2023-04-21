import { ObjectMissingSomeOfRequiredPropertiesError } from "./exceptions/deserialization";
import { objectHasOwnProperties } from "./utils/mics";


export default function ApplicationIDSequences() {
    this.vertex_id = 1;
    this.edge_id = 1;
}


ApplicationIDSequences.prototype.incrementVertexId = function() {
    this.vertex_id++;
}


ApplicationIDSequences.prototype.incrementEdgeId = function() { 
    this.edge_id++;
};


ApplicationIDSequences.toJSON = function() {
    return {
        vertex_id: this.vertex_id,
        edge_id: this.edge_id
    };
}


ApplicationIDSequences.fromObject = function(object) {
    if (!objectHasOwnProperties(object, ['vertex_id', 'edge_id']))
        throw new ObjectMissingSomeOfRequiredPropertiesError();

    let application_id_sequences = new ApplicationIDSequences();
    application_id_sequences.vertex_id = object['vertex_id'];
    application_id_sequences.edge_id = object['edge_id'];

    return application_id_sequences;
}
