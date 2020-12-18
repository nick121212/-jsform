import { resolve } from "../libs/resolve";
import { isBoolean } from "../utils";
/**
 * 解析schema中的关键字 definitions
 * 如果发现有definitions关键字，解析schema
 * @param  {string}      $id    当前的schema的ID
 * @param  {JSONSchema6} schema 当前的schema
 * @return {JSONSchema6}        处理过后的schema
 */

var defined = function defined(_$id, schema) {
  var definitions = schema.definitions;

  if (!definitions) {
    return schema;
  }

  for (var key in definitions) {
    if (definitions.hasOwnProperty(key)) {
      var element = definitions[key];

      if (!isBoolean(element)) {
        resolve(element, "".concat(schema.$id, "#/definitions/").concat(key));
      }
    }
  }

  return schema;
};

export default defined;
//# sourceMappingURL=defined.js.map