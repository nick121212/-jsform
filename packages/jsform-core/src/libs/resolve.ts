import { JSONSchema6 } from "json-schema";
import invariant from "invariant";

import {
    schemaFieldFactory,
    schemaKeysFactory,
    schemaTypeFactory,
} from "../factory";
import { isString } from "../utils";
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
const getDataKeysBySchemaPath = (
    schemaPath: string,
    keepFirst = false
): string[] => {
    const regexp = /#$/g;

    return schemaPath
        .split("/")
        .map((key: string, index: number) => {
            // 第一个替换末尾的#
            if (index === 0 && regexp.test(key)) {
                // 这里是regexp的陷阱,需要修改lastIndex = 0
                // 对于同一个正则表达式对象regex，不能重复调用：第一次返回true，第二次就返回false，很显然这种效果不是我们想要的。
                // 这是因为RegExp.test()方法，第一次从位置0开始查找，可以匹配；第二次的查找位置就不是0了，说以就不能匹配了。
                regexp.lastIndex = 0;

                return keepFirst ? key.replace(regexp, "") : null;
            }

            // 去掉properties
            if (key === "properties") {
                return null;
            }

            // 转换items成-
            if (key === "items") {
                return "-";
            }

            return key;
        })
        .filter((key: string | null) => {
            return key !== null;
        }) as string[];
};

/**
 * 通过keypath获取数据路径
 *
 * @param {string} schemaPath
 * @param {string} keyPath
 * @returns
 */
const getKeysByKeyPath = (schemaPath: string, keyPath: string) => {
    const schemaId = getSchemaId(schemaPath);

    return keyPath
        .split("/")
        .map((key: string, index: number) => {
            if (index === 0 && key === schemaId) {
                return null;
            }

            return key;
        })
        .filter((key: string | null) => {
            return key !== null;
        }) as string[];
};

/**
 * 从schemaPath中获取$id
 * @param   {String} schemaPath schemaPath
 * @returns {String}
 */
const getSchemaId = (schemaPath: string): string => {
    const keys = schemaPath.split("/");
    const regexp = /#$/g;

    if (!keys.length) {
        // invariant(false, `${schemaPath} not a valid schemaPath.`);
        return "";
    }

    return keys[0].replace(regexp, "");
};

/**
 * 初始化schema
 * 1. 判断$id，如果不存在，报错
 * 2. 验证schema的结构是否正确，不正确报错
 * @param   {JSONSchema6}  schema  schema
 * @returns {JSONSchema6}          处理完成的schema
 */
const initSchema = (schema: JSONSchema6): JSONSchema6 => {
    let $id: string | undefined = schema.$id;

    // 如果没有$id, 同时没有$ref的情况下直接报错
    if (!$id && !schema.$ref) {
        invariant(false, "id is required");
        return schema;
    }

    return schema;
};

/**
 * TODO
 * 遍历schema，生成map
 * 1. 如果schema.type不是string，报错
 * 2. 调用【schemaTypeFactory
 * @param {JSONSchema6} schema  schema
 * @param {String}      $id     id
 */
const compileSchema = ($id: string, schema: JSONSchema6): JSONSchema6 => {
    if (!schemaTypeFactory.has("normal")) {
        return schema;
    }

    const id = $id || (schema.$id || "") + "#";
    let schemaGenera = schemaTypeFactory.get("normal")(id, schema);

    // 如果不存在type，但是$ref则直接返回
    if (!schema.type || schema.$ref) {
        return schemaGenera;
    }

    // 这里只解析type为字符串的结构，不支持数组类型的type
    if (!isString(schema.type)) {
        invariant(false, `schema type[${schema.type}] can only be string.`);
        return schemaGenera;
    }

    const type: string = schema.type.toString();

    // 这里调用相对应的type的方法，来解析schema
    if (schemaTypeFactory.has(type) && ["array", "object"].indexOf(type) >= 0) {
        schemaGenera = schemaTypeFactory.get(type)(id, schema);
    }

    return schemaGenera;
};

/**
 * 解析schema
 * @param  {JSONSchema6}   schema      需要处理的JsonSchema
 * @param  {String}        $id         JsonSchema 的id
 * @returns {JSONSchema6}              返回处理过后的JsonSchema
 */
const resolve = (schema: JSONSchema6, $id = ""): JSONSchema6 => {
    const schemaGenera = !$id ? initSchema(schema) : schema;
    const id = $id || schema.$ref || "";

    // 生成map
    return compileSchema(id, schemaGenera);
};

/**
 * 通过数据路径找到当前的schema
 *
 * @param {string} keyPath       数据路径
 * @returns {JsFormJsonSchema}   Schema
 */
const getSchemaFromKeyPath = (
    keyPath: string,
    originKeyPath?: string
): UiSchema => {
    let keyPathExist = keyPath.split("/");
    let keyPathNotExist = [];

    while (keyPathExist.length) {
        if (!schemaKeysFactory.has(keyPathExist.join("/"))) {
            keyPathNotExist.push(keyPathExist.pop());
        } else {
            break;
        }
    }

    // 路径存在，直接返回schema
    if (!keyPathNotExist.length) {
        const schema = schemaFieldFactory.get(schemaKeysFactory.get(keyPath));

        return {
            ...schema,
            keys: getKeysByKeyPath(
                schema.schemaPath ?? "",
                originKeyPath || keyPath
            ),
            key: originKeyPath || keyPath,
        };
    }

    const schemaExist = schemaFieldFactory.get(
        schemaKeysFactory.get(keyPathExist.join("/"))
    );

    // 如果没有找到，并且存在$ref，则使用$ref再次查找，不然则抛出异常
    if (!schemaExist?.$ref) {
        console.error(`there is no schema in [${keyPath}]`);
        throw invariant(false, `there is no schema in [${keyPath}]`);
    }

    // 继续查找 使用$ref + keyPathNotExist部分作为keyPath
    return getSchemaFromKeyPath(
        getDataKeysBySchemaPath(
            [schemaExist.$ref, ...keyPathNotExist.reverse()].join("/"),
            true
        ).join("/"),
        originKeyPath || keyPath
    );
};


/**
 * 获取当前路径之后的子schema
 * 
 * @param {string} keyPath 
 * @returns {UiSchema[]} 
 */
const getSubSchemas = (keyPath: string): UiSchema[] => {
    const curScehma = getSchemaFromKeyPath(keyPath);

    if (curScehma.type === "object") {
        return (
            Object.keys(curScehma.properties ?? {}).map((k: string) => {
                return getSchemaFromKeyPath(`${keyPath}/${k}`);
            }) || []
        );
    }

    if (curScehma.type === "array") {
        return [getSchemaFromKeyPath(`${keyPath}/-`)];
    }

    return [];
};

export {
    getDataKeysBySchemaPath,
    getSchemaId,
    resolve,
    getSchemaFromKeyPath,
    getSubSchemas,
};
