import { ref, oneof, anyof, definitions } from "./keywords";
import { array, normal, object } from "./types";
import { schemaFieldFactory, schemaKeyWordFactory, schemaTypeFactory, schemaKeysFactory } from "./factory";

import { JsFormJsonSchema } from "./models/jsonschema";
import { UiSchema } from "./models/uischema";

export * from "./libs";
export { typeOf, isArray, isString, isNumber, mergeKeys } from "./utils";

schemaKeyWordFactory.add("definitions", definitions)
    .add("oneof", oneof)
    .add("anyof", anyof)
    .add("ref", ref);

schemaTypeFactory.add("array", array)
    .add("normal", normal)
    .add("object", object);

export {
    schemaKeysFactory,
    schemaFieldFactory,
    schemaKeyWordFactory,
    schemaTypeFactory,
    JsFormJsonSchema, 
    UiSchema
};
