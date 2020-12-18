import { JSONSchema6 } from "json-schema";
declare const _default: (schemaKey: string, schema: JSONSchema6) => JSONSchema6;
/**
 * 解析schema中的type=object的结构
 * 如果存在schema.properties,则遍历properties，继续解析schema.properties[key]
 * @param  {JSONSchema6} schema    当前的schema
 * @param  {String}      schemaKey 当前的schemaKey
 * @return {JSONSchema6}           返回处理过后的schema
 */
export default _default;
//# sourceMappingURL=object.d.ts.map