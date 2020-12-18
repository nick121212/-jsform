import { JSONSchema6 } from "json-schema";
declare const _default: ($id: string, schema: JSONSchema6) => JSONSchema6;
/**
 * 解析schema中的关键字 $ref
 * 1. 获取$ref的id
 * 2. 重新定义$id = $id + $ref, 赋值给$ref
 * 3. 解析schema
 * @param  {string}      $id    当前的schema的ID
 * @param  {JSONSchema6} schema 当前的schema
 * @return {JSONSchema6}        处理过后的schema
 */
export default _default;
//# sourceMappingURL=ref.d.ts.map