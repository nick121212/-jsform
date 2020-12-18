import { schemaFieldFactory, schemaKeysFactory, schemaKeyWordFactory } from "../factory";
import { getDataKeysBySchemaPath, getSchemaId } from "../libs/resolve";
/**
 * 遍历所有的keyword，解析schema
 * @param   {JSONSchema6} schema schema
 * @returns {JSONSchema6}        解析过后的schema
 */

export var convertKeys = function convertKeys($id, schema) {
  schemaKeyWordFactory.forEach(function (_key, val) {
    if (schema) {
      schema = val($id, schema);
    }
  });
  return schema;
};
/**
 * 解析schema中的type!=array && type!=object的结构
 * @param  {JSONSchema6} schema    当前的schema
 * @param  {String}      schemaKey 当前的schemaKey
 * @return {JSONSchema6}           返回处理过后的schema
 */

export default (function (schemaKey, schema) {
  var keys = getDataKeysBySchemaPath(schemaKey, false),
      $id = getSchemaId(schemaKey) || schema.$id || "",
      currentSchema = convertKeys(schemaKey, schema),
      alreadyHasEmptySchema = false,
      emptySchema = {}; // 先从缓存中提取schema，如果存在的话

  alreadyHasEmptySchema = schemaFieldFactory.has(schemaKey);

  if (alreadyHasEmptySchema) {
    emptySchema = schemaFieldFactory.get(schemaKey);
  } // 如果已经存在，则直接返回


  if (alreadyHasEmptySchema && emptySchema.schemaPath) {
    return currentSchema || schema;
  }

  if (schema.$id && schema.$ref) {
    schemaKeysFactory.add(schema.$id, schema.$ref);
  } // 将当前获取的schema加入到schemaFieldFactory中


  schemaFieldFactory.add(schemaKey, Object.assign(emptySchema, currentSchema || schema, {
    // keys,
    schemaPath: schemaKey
  })); // 加入key的索引

  schemaKeysFactory.add([$id].concat(keys).join("/"), schemaKey);
  return currentSchema || schema;
});
//# sourceMappingURL=normal.js.map