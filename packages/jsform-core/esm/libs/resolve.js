function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import invariant from "invariant";
import { schemaFieldFactory, schemaKeysFactory, schemaTypeFactory } from "../factory";
import { isString } from "../utils";

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
var getDataKeysBySchemaPath = function getDataKeysBySchemaPath(schemaPath) {
  var keepFirst = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var regexp = /#$/g;
  return schemaPath.split("/").map(function (key, index) {
    // 第一个替换末尾的#
    if (index === 0 && regexp.test(key)) {
      // 这里是regexp的陷阱,需要修改lastIndex = 0
      // 对于同一个正则表达式对象regex，不能重复调用：第一次返回true，第二次就返回false，很显然这种效果不是我们想要的。
      // 这是因为RegExp.test()方法，第一次从位置0开始查找，可以匹配；第二次的查找位置就不是0了，说以就不能匹配了。
      regexp.lastIndex = 0;
      return keepFirst ? key.replace(regexp, "") : null;
    } // 去掉properties


    if (key === "properties") {
      return null;
    } // 转换items成-


    if (key === "items") {
      return "-";
    }

    return key;
  }).filter(function (key) {
    return key !== null;
  });
};
/**
 * 通过keypath获取数据路径
 *
 * @param {string} schemaPath
 * @param {string} keyPath
 * @returns
 */


var getKeysByKeyPath = function getKeysByKeyPath(schemaPath, keyPath) {
  var schemaId = getSchemaId(schemaPath);
  return keyPath.split("/").map(function (key, index) {
    if (index === 0 && key === schemaId) {
      return null;
    }

    return key;
  }).filter(function (key) {
    return key !== null;
  });
};
/**
 * 从schemaPath中获取$id
 * @param   {String} schemaPath schemaPath
 * @returns {String}
 */


var getSchemaId = function getSchemaId(schemaPath) {
  var keys = schemaPath.split("/");
  var regexp = /#$/g;

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


var initSchema = function initSchema(schema) {
  var $id = schema.$id; // 如果没有$id, 同时没有$ref的情况下直接报错

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


var compileSchema = function compileSchema($id, schema) {
  if (!schemaTypeFactory.has("normal")) {
    return schema;
  }

  var id = $id || (schema.$id || "") + "#";
  var schemaGenera = schemaTypeFactory.get("normal")(id, schema); // 如果不存在type，但是$ref则直接返回

  if (!schema.type || schema.$ref) {
    return schemaGenera;
  } // 这里只解析type为字符串的结构，不支持数组类型的type


  if (!isString(schema.type)) {
    invariant(false, "schema type[".concat(schema.type, "] can only be string."));
    return schemaGenera;
  }

  var type = schema.type.toString(); // 这里调用相对应的type的方法，来解析schema

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


var resolve = function resolve(schema) {
  var $id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var schemaGenera = !$id ? initSchema(schema) : schema;
  var id = $id || schema.$ref || ""; // 生成map

  return compileSchema(id, schemaGenera);
};
/**
 * 通过数据路径找到当前的schema
 *
 * @param {string} keyPath       数据路径
 * @returns {JsFormJsonSchema}   Schema
 */


var getSchemaFromKeyPath = function getSchemaFromKeyPath(keyPath, originKeyPath) {
  var keyPathExist = keyPath.split("/");
  var keyPathNotExist = [];

  while (keyPathExist.length) {
    if (!schemaKeysFactory.has(keyPathExist.join("/"))) {
      keyPathNotExist.push(keyPathExist.pop());
    } else {
      break;
    }
  } // 路径存在，直接返回schema


  if (!keyPathNotExist.length) {
    var _schema$schemaPath;

    var schema = schemaFieldFactory.get(schemaKeysFactory.get(keyPath));
    return _objectSpread(_objectSpread({}, schema), {}, {
      keys: getKeysByKeyPath((_schema$schemaPath = schema.schemaPath) !== null && _schema$schemaPath !== void 0 ? _schema$schemaPath : "", originKeyPath || keyPath),
      key: originKeyPath || keyPath
    });
  }

  var schemaExist = schemaFieldFactory.get(schemaKeysFactory.get(keyPathExist.join("/"))); // 如果没有找到，并且存在$ref，则使用$ref再次查找，不然则抛出异常

  if (!(schemaExist === null || schemaExist === void 0 ? void 0 : schemaExist.$ref)) {
    console.error("there is no schema in [".concat(keyPath, "]"));
    throw invariant(false, "there is no schema in [".concat(keyPath, "]"));
  } // 继续查找 使用$ref + keyPathNotExist部分作为keyPath


  return getSchemaFromKeyPath(getDataKeysBySchemaPath([schemaExist.$ref].concat(_toConsumableArray(keyPathNotExist.reverse())).join("/"), true).join("/"), originKeyPath || keyPath);
};
/**
 * 获取当前路径之后的子schema
 * 
 * @param {string} keyPath 
 * @returns {UiSchema[]} 
 */


var getSubSchemas = function getSubSchemas(keyPath) {
  var curScehma = getSchemaFromKeyPath(keyPath);

  if (curScehma.type === "object") {
    var _curScehma$properties;

    return Object.keys((_curScehma$properties = curScehma.properties) !== null && _curScehma$properties !== void 0 ? _curScehma$properties : {}).map(function (k) {
      return getSchemaFromKeyPath("".concat(keyPath, "/").concat(k));
    }) || [];
  }

  if (curScehma.type === "array") {
    return [getSchemaFromKeyPath("".concat(keyPath, "/-"))];
  }

  return [];
};

export { getDataKeysBySchemaPath, getSchemaId, resolve, getSchemaFromKeyPath, getSubSchemas };
//# sourceMappingURL=resolve.js.map