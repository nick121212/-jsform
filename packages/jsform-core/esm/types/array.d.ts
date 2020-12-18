import { JSONSchema6 } from "json-schema";
declare const _default: (schemaPath: string, schema: JSONSchema6) => JSONSchema6;
/**
 * 解析schema中的type=array的结构
 * 如果存在items,则继续解析schema.item
 * @param  {JSONSchema6} schema    当前的schema
 * @param  {String}      schemaPath 当前的schemaPath ,example "a#/properties/b/properties/c"
 * @return {JSONSchema6}           返回处理过后的schema,example "{title:'21',$id:'a'}"
 */
export default _default;
//# sourceMappingURL=array.d.ts.map