import { JSONSchema6 } from "json-schema";
/**
 * 遍历所有的keyword，解析schema
 * @param   {JSONSchema6} schema schema
 * @returns {JSONSchema6}        解析过后的schema
 */
export declare const convertKeys: ($id: string, schema: JSONSchema6) => JSONSchema6;
declare const _default: (schemaKey: string, schema: JSONSchema6) => JSONSchema6;
/**
 * 解析schema中的type!=array && type!=object的结构
 * @param  {JSONSchema6} schema    当前的schema
 * @param  {String}      schemaKey 当前的schemaKey
 * @return {JSONSchema6}           返回处理过后的schema
 */
export default _default;
//# sourceMappingURL=normal.d.ts.map