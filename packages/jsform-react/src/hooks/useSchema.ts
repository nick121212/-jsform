import { useCallback, useEffect, useRef, useState } from "react";
import { JSONSchema6 } from "json-schema";
import { resolve, merge, JsFormJsonSchema } from "jsform-core";

import { getSchemaKey } from "../utils/schema-key";

export default function useSchema(schema: JSONSchema6) {
    const [schemaResolved, setSchemaResolved] = useState<JsFormJsonSchema>();
    const schemaRef = useRef(schema);

    const getKey = useCallback(
        (schemaPath: string, indexArray: number[] = []) => {
            if (!schemaResolved) {
                return "";
            }

            const merged = merge(schema.$id!, undefined, [schemaPath]);

            if (!merged.length) {
                return "";
            }
            return getSchemaKey(merged[0], indexArray);
        },
        [schemaResolved, schema.$id]
    );

    useEffect(() => {
        schemaRef.current = schema;
    }, [schema]);

    useEffect(() => {
        if (!schemaRef.current) {
            return;
        }

        setSchemaResolved(resolve(schemaRef.current));
    }, [schema.$id]);

    return { schemaResolved, getKey };
}
