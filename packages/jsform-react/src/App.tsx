import React from "react";

import { schema } from "./schema";
import useSchema from "./hooks/useSchema";
import { JsonSchemaBridge } from "./bridge/json-schema/jsonSchema";

const bridge = new JsonSchemaBridge(schema as any);

// console.log(bridge.getField("types"));
// console.log(bridge.getSubFields(""));
console.log(bridge.getSubFields("gropus/-"));

function App() {
    const { getKey, schemaResolved } = useSchema(schema as any);

    console.log(schemaResolved, getKey);

    return (
        <form>
            <button type="button">Add Type</button>
            <input type="submit" />
        </form>
    );
}

export default App;
