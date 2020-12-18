function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * 暴露hasOwnProperty方法
 */
export var hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * 暴露toString方法
 */

export var toString = Object.prototype.toString;
export function typeOf(value) {
  if (null === value) {
    return "null";
  }

  var type = _typeof(value);

  if ("undefined" === type || "string" === type) {
    return type;
  }

  var typeString = toString.call(value);

  switch (typeString) {
    case "[object Array]":
      return "array";

    case "[object Date]":
      return "date";

    case "[object Boolean]":
      return "boolean";

    case "[object Number]":
      return "number";

    case "[object Function]":
      return "function";

    case "[object RegExp]":
      return "regexp";

    case "[object Object]":
      if (undefined !== value.nodeType) {
        if (3 === value.nodeType) {
          return /\S/.test(value.nodeValue) ? "textnode" : "whitespace";
        } else {
          return "element";
        }
      } else {
        return "object";
      }

    default:
      return "unknow";
  }
}
/**
 * 判断参数是不是数字
 * @param   {Any}      n    需要验证的参数
 * @returns {Boolean}
 */

export var isNumber = function isNumber(n) {
  return typeOf(n) === "number";
};
/**
 * 判断参数是不是字符串
 * @param   {Any}      n    需要验证的参数
 * @returns {Boolean}
 */

export var isString = function isString(n) {
  return typeOf(n) === "string";
};
/**
 * 判断参数是不是boolean
 * @param   {Any}      n    需要验证的参数
 * @returns {Boolean}
 */

export var isArray = function isArray(n) {
  return typeOf(n) === "array";
};
/**
 * 判断参数是不是boolean
 * @param   {Any}      n    需要验证的参数
 * @returns {Boolean}
 */

export var isBoolean = function isBoolean(n) {
  return typeOf(n) === "boolean";
};
/**
 * 解析keys
 * 1. 遍历keys中的元素，如果遇到-，则替换成数字
 * @param   {string[]} originKeys 需要做替换的数据路径
 * @param   {string[]} indexList  当前传递过来的indexList
 * @returns {string[]}
 */

export var mergeKeys = function mergeKeys(originKeys) {
  var indexList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var arrayLevelCopy = _toConsumableArray(indexList);

  var keys = originKeys.reverse().map(function (key) {
    if (key === "-") {
      var index = arrayLevelCopy.pop();
      return (typeof index === "undefined" ? "" : index).toString();
    }

    return key;
  });
  return keys.reverse();
};
//# sourceMappingURL=index.js.map