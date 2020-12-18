import invariant from "invariant";
import { resolve } from "../libs/resolve";
var pro = "properties";
/**
 * 解析schema中的type=object的结构
 * 如果存在schema.properties,则遍历properties，继续解析schema.properties[key]
 * @param  {JSONSchema6} schema    当前的schema
 * @param  {String}      schemaKey 当前的schemaKey
 * @return {JSONSchema6}           返回处理过后的schema
 */

export default (function (schemaKey, schema) {
  var properties = schema.properties,
      _schema$required = schema.required,
      required = _schema$required === void 0 ? [] : _schema$required,
      $ref = schema.$ref;

  if (properties && !$ref) {
    Object.keys(properties).forEach(function (key) {
      if ([pro, "items"].indexOf(key) >= 0) {
        invariant(false, "".concat(key, "can not be key words."));
        return;
      }

      if (!properties || !properties[key]) {
        return;
      }

      Object.assign(properties[key], {
        isRequired: required.indexOf(key) >= 0
      });
      resolve(properties[key], [schemaKey, pro, key].join("/")); // const keys: string[] = getDataKeysBySchemaPath(
      //     [schemaKey, pro, key].join("/")
      // );
      // Object.assign(mergeSchema, {
      //     keys,
      // });
    });
  }

  return schema;
});
//# sourceMappingURL=object.js.map