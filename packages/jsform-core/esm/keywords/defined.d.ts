import { JSONSchema6 } from "json-schema";
/**
 * 解析schema中的关键字 definitions
 * 如果发现有definitions关键字，解析schema
 * @param  {string}      $id    当前的schema的ID
 * @param  {JSONSchema6} schema 当前的schema
 * @return {JSONSchema6}        处理过后的schema
 */
declare const defined: (_$id: string, schema: JSONSchema6) => JSONSchema6;
export default defined;
//# sourceMappingURL=defined.d.ts.map