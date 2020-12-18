import { JSONSchema6 } from "json-schema";
/**
 * 解析schema中的关键字 oneOf
 * 如果发现有oneOf关键字，遍历替换成schema
 * @param  {string}      $id    当前的schema的ID
 * @param  {JSONSchema6} schema 当前的schema
 * @return {JSONSchema6}        处理过后的schema
 */
declare const anyOf: ($id: string, schema: JSONSchema6) => JSONSchema6;
export default anyOf;
//# sourceMappingURL=anyof.d.ts.map