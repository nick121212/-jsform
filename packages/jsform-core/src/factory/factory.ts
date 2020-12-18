import { JSONSchema6 } from "json-schema";

import { BaseFactory } from "../libs/factory";
import { JsFormJsonSchema } from "../models/jsonschema";

/**
 * JsonSchema工厂
 */
export const schemaFieldFactory = new BaseFactory<JsFormJsonSchema>();
/**
 * 关键字工厂
 */
export const schemaKeyWordFactory = new BaseFactory<($id: string, schema: JSONSchema6) => JSONSchema6>();
/**
 * 类型工厂
 */
export const schemaTypeFactory = new BaseFactory<($id: string, schema: JSONSchema6) => JSONSchema6>();
/**
 * 
 * 存放jsonkey与schemaPath的对应关系
 */
export const schemaKeysFactory = new BaseFactory<string>();