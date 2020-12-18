function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @file 工厂类
 */
import { hasOwnProperty } from "../utils";
/**
 * 工厂类
 * @class
 */

export var BaseFactory = /*#__PURE__*/function () {
  function BaseFactory() {
    _classCallCheck(this, BaseFactory);

    this.store = {};
    this._lock = {};
  }

  _createClass(BaseFactory, [{
    key: "add",

    /**
     * 添加一个实例
     * @param {string} name 实例的名称
     * @param {T} instance  实例
     * @param {boolean} [override=false] 是否覆盖
     * @returns {BaseFactory<T>} 是否添加成功
     * @memberof BaseFactory
     * @example
     * 
     * this.add("key", true);
     */
    value: function add(name, instance) {
      var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (hasOwnProperty.call(this._lock, name) || this.has(name) && !override) {
        return this;
      }

      this.store[name] = instance;
      return this;
    }
    /**
     * 是否存在key值
     * @param {string} key key值
     * @returns {boolean} 是否存在
     * @memberof BaseFactory
     */

  }, {
    key: "has",
    value: function has(key) {
      return hasOwnProperty.call(this.store, key);
    }
    /**
     * 获取一个实例
     * @param {string} key  实例标志
     * @returns {T}         返回当前key对应的实例
     * @memberof BaseFactory
     */

  }, {
    key: "get",
    value: function get(key) {
      if (this.has(key)) {
        return this.store[key];
      }

      return null;
    }
    /**
     * 锁定实例,锁定后不能删除和覆盖
     * @param {string} key  key
     * @memberof BaseFactory
     */

  }, {
    key: "lock",
    value: function lock(key) {
      if (this.has(key)) {
        this._lock[key] = true;
      }
    }
    /**
     * 解锁实例
     * @param {string} key  key
     * @memberof BaseFactory
     */

  }, {
    key: "unLock",
    value: function unLock(key) {
      if (this.has(key)) {
        Reflect.deleteProperty(this._lock, key);
      }
    }
    /**
     * 遍历所有的元素
     * @param {(key: string, val: T) => any} func 遍历方法
     * @returns {void}
     * @memberof BaseFactory
     */

  }, {
    key: "forEach",
    value: function forEach(func) {
      if (!func) {
        return;
      }

      for (var _key in this.store) {
        var element = this.store[_key];

        if (func(_key, element) === false) {
          break;
        }
      }
    }
    /**
     * 清空当前的hash
     * @memberof BaseFactory
     */

  }, {
    key: "clear",
    value: function clear() {
      this.store = {};
      this._lock = {};
    }
  }]);

  return BaseFactory;
}();
//# sourceMappingURL=factory.js.map