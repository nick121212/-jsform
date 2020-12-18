import { JSONSchema6 } from "json-schema";
import { BaseFactory } from "../libs/factory";
import { JsFormJsonSchema } from "../models/jsonschema";
/**
 * JsonSchema工厂
 */
export declare const schemaFieldFactory: BaseFactory<JsFormJsonSchema>;
/**
 * 关键字工厂
 */
export declare const schemaKeyWordFactory: BaseFactory<($id: string, schema: JSONSchema6) => JSONSchema6>;
/**
 * 类型工厂
 */
export declare const schemaTypeFactory: BaseFactory<($id: string, schema: JSONSchema6) => JSONSchema6>;
/**
 *
 * 存放jsonkey与schemaPath的对应关系
 */
export declare const schemaKeysFactory: BaseFactory<string>;
//# sourceMappingURL=factory.d.ts.map