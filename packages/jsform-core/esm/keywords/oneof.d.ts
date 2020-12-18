import { JSONSchema6 } from "json-schema";
declare const _default: (_$id: string, schema: JSONSchema6) => JSONSchema6;
/**
 * 解析schema中的关键字 oneOf
 * 如果发现有oneOf关键字，遍历替换成schema
 * @param  {string}      $id    当前的schema的ID
 * @param  {JSONSchema6} schema 当前的schema
 * @return {JSONSchema6}        处理过后的schema
 */
export default _default;
//# sourceMappingURL=oneof.d.ts.map