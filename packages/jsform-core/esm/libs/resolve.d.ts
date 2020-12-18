import { JSONSchema6 } from "json-schema";
import { UiSchema } from "../models";
/**
 * schema路径解析
 * 把schemaPath解析成JsonPath
 * 1. 去掉properties，items关键字转换成【 - 】
 * 2. 第一个字符去掉末尾的【 # 】
 * @example design#/properties/appType => ["appType']
 * @example design#/properties/appType/type => ["appType','type']
 * @example design#/properties/appType/items/properties/type => ["appType', '-', 'type']
 * @param   {String}    schemaPath schemaPath
 * @param   {Boolean}   keepFirst  是否需要保留schemaId
 * @returns {String[]}             返回数据路径数组
 */
declare const getDataKeysBySchemaPath: (schemaPath: string, keepFirst?: boolean) => string[];
/**
 * 从schemaPath中获取$id
 * @param   {String} schemaPath schemaPath
 * @returns {String}
 */
declare const getSchemaId: (schemaPath: string) => string;
/**
 * 解析schema
 * @param  {JSONSchema6}   schema      需要处理的JsonSchema
 * @param  {String}        $id         JsonSchema 的id
 * @returns {JSONSchema6}              返回处理过后的JsonSchema
 */
declare const resolve: (schema: JSONSchema6, $id?: string) => JSONSchema6;
/**
 * 通过数据路径找到当前的schema
 *
 * @param {string} keyPath       数据路径
 * @returns {JsFormJsonSchema}   Schema
 */
declare const getSchemaFromKeyPath: (keyPath: string, originKeyPath?: string | undefined) => UiSchema;
/**
 * 获取当前路径之后的子schema
 *
 * @param {string} keyPath
 * @returns {UiSchema[]}
 */
declare const getSubSchemas: (keyPath: string) => UiSchema[];
export { getDataKeysBySchemaPath, getSchemaId, resolve, getSchemaFromKeyPath, getSubSchemas, };
//# sourceMappingURL=resolve.d.ts.map