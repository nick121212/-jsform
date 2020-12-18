import { JSONSchema6 } from "json-schema";
import invariant from "invariant";

import { getDataKeysBySchemaPath, getSchemaId } from "../libs/resolve";
import { schemaFieldFactory } from "../factory";
import { JsFormJsonSchema } from "../models/jsonschema";

/**
 * 解析schema中的关键字 $ref
 * 1. 获取$ref的id
 * 2. 重新定义$id = $id + $ref, 赋值给$ref
 * 3. 解析schema
 * @param  {string}      $id    当前的schema的ID
 * @param  {JSONSchema6} schema 当前的schema
 * @return {JSONSchema6}        处理过后的schema
 */
export default ($id: string, schema: JSONSchema6) => {
    if (schema && schema.$ref) {
        const schemaId = getSchemaId(schema.$ref);
        let refName = schema.$ref;

        if (schema.$id) {
            refName = schema.$id + schema.$ref;
        } else if (!schemaId) {
            refName = getSchemaId($id) + schema.$ref;
        }

        schema.$ref = refName;

        if (!schemaFieldFactory.has(refName)) {
            schemaFieldFactory.add(refName, {});
        }

        const refSchema: JsFormJsonSchema = schemaFieldFactory.get(refName);

        if (refSchema) {
            let schemaAjv = Object.assign({}, refSchema) as JSONSchema6;

            schemaAjv.$ref = refName;

            Reflect.deleteProperty(schemaAjv, "$id");
            Object.assign(schemaAjv, {
                refKeys: getDataKeysBySchemaPath(refName)
            });

            return schemaAjv;
        }

        invariant(false, `${refName} not exist.`);
    }

    return schema;
};
