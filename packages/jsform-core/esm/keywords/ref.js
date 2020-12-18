import invariant from "invariant";
import { getDataKeysBySchemaPath, getSchemaId } from "../libs/resolve";
import { schemaFieldFactory } from "../factory";

/**
 * 解析schema中的关键字 $ref
 * 1. 获取$ref的id
 * 2. 重新定义$id = $id + $ref, 赋值给$ref
 * 3. 解析schema
 * @param  {string}      $id    当前的schema的ID
 * @param  {JSONSchema6} schema 当前的schema
 * @return {JSONSchema6}        处理过后的schema
 */
export default (function ($id, schema) {
  if (schema && schema.$ref) {
    var schemaId = getSchemaId(schema.$ref);
    var refName = schema.$ref;

    if (schema.$id) {
      refName = schema.$id + schema.$ref;
    } else if (!schemaId) {
      refName = getSchemaId($id) + schema.$ref;
    }

    schema.$ref = refName;

    if (!schemaFieldFactory.has(refName)) {
      schemaFieldFactory.add(refName, {});
    }

    var refSchema = schemaFieldFactory.get(refName);

    if (refSchema) {
      var schemaAjv = Object.assign({}, refSchema);
      schemaAjv.$ref = refName;
      Reflect.deleteProperty(schemaAjv, "$id");
      Object.assign(schemaAjv, {
        refKeys: getDataKeysBySchemaPath(refName)
      });
      return schemaAjv;
    }

    invariant(false, "".concat(refName, " not exist."));
  }

  return schema;
});
//# sourceMappingURL=ref.js.map