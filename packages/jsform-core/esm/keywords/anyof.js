import { resolve, getSchemaId } from "../libs/resolve";
import { isArray } from "../utils";
/**
 * 解析schema中的关键字 oneOf
 * 如果发现有oneOf关键字，遍历替换成schema
 * @param  {string}      $id    当前的schema的ID
 * @param  {JSONSchema6} schema 当前的schema
 * @return {JSONSchema6}        处理过后的schema
 */

var anyOf = function anyOf($id, schema) {
  var anyOf = schema.anyOf;

  if (anyOf && isArray(anyOf)) {
    schema.anyOf = anyOf.map(function (schemaOfOne) {
      return resolve(schemaOfOne, schema.$id || getSchemaId(schema.$ref || "") ? undefined : getSchemaId($id));
    });
  }

  return schema;
};

export default anyOf;
//# sourceMappingURL=anyof.js.map