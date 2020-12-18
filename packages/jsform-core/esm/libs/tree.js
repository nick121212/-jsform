function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

import { isNumber } from "../utils";

/**
 * tree map struct
 * 这里用来记录数据的元数据信息
 * 元数据信息包括，isValid，isLoading，isShow，...etc
 */
export var TreeMap = /*#__PURE__*/function () {
  /**
    * 构造函数
    * @param   {String}  key    当前节点的key
    * @param   {any}     value  当前节点的值
    * @param   {TreeMap<T>} parent 当前节点的父亲节点
    * @returns {Void}
    */
  function TreeMap(key, value, parent) {
    _classCallCheck(this, TreeMap);

    this.children = [];
  }
  /**
  * 添加一个子元素
  * @param    {Array<Tsn>} keys  节点的路径，遍历keys来动态创建节点 example ["root","b"]  root -> b
  * @param    {any}        value 孩子的数据
  * @returns  {TreeMap<T>}
  */


  _createClass(TreeMap, [{
    key: "addChild",
    value: function addChild(keys, value) {
      var curNode = this;
      var child = null;

      if (!keys.length) {
        return this;
      }

      var _iterator = _createForOfIteratorHelper(keys),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _key = _step.value;
          child = curNode.contains(_key); // 如果是数字的话，则说明是数组，key改成`-`
          // 如果不是数组的话，则无所谓顺序，直接push就行
          // 如果是数组，则要保证顺序和数据的下标一致

          if (!child) {
            if (isNumber(_key)) {
              child = new TreeMap("-", null, curNode);
              curNode.children[_key] = child;
            } else {
              child = new TreeMap(_key.toString(), null, curNode);
              curNode.children.push(child);
            }
          }

          curNode = child;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      child.value = value;
      return child;
    }
    /**
    * 获取当前的key
    * 如果key是`-`,代表是数组，则转换成数组下标
    * time complexity = O(1) / Constant
    * @returns string
    */

  }, {
    key: "getKey",
    value: function getKey() {
      if (!this.key || this.key === "-") {
        return this.getIndexInParent().toString();
      }

      return this.key;
    }
    /**
    * 获取当前节点的keys路径
    * time complexity = O(1) / Constant
    * @returns {string[]}
    */

  }, {
    key: "getCurrentKeys",
    value: function getCurrentKeys() {
      var keys = [];

      if (this.parent) {
        keys = keys.concat(this.parent.getCurrentKeys());
      }

      return keys.concat([this.key]);
    }
    /**
    * 获取当前节点在父节点中的下标索引
    * time complexity = O(1) / Constant
    * @returns {number}
    */

  }, {
    key: "getIndexInParent",
    value: function getIndexInParent() {
      var index = -1;

      if (!this.parent) {
        return index;
      }

      var children = this.parent.children;

      for (var i = 0, n = children.length; i < n; i++) {
        var child = children[i];

        if (child && child === this) {
          index = i;
          break;
        }
      }

      return index;
    }
    /**
    * 从当前节点查找是否存在节点
    * time complexity = O(n) / Linear
    * @param   {Tsn}     key 节点的数据
    * @returns {TreeMap<T>}
    */

  }, {
    key: "contains",
    value: function contains(key) {
      // 如果是数字的话，直接返回children中对应下标的元素
      if (isNumber(key)) {
        if (this.children.length <= key) {
          return null;
        }

        var child = this.children[key];

        if (!child) {
          this.children[key] = new TreeMap("-", null, this);
          child = this.children[key];
        }

        return child;
      } // 如果当前节点的key===要搜索的key，则返回本身


      if (this.getKey() === key) {
        return this;
      } // 如果没有children，则返回空


      if (!this.children || this.children.length === 0) {
        return null;
      } // 遍历子节点，层层递归，直到找到


      for (var i = 0; i < this.children.length; i++) {
        var _child = this.children[i];

        if (_child && _child.contains(key)) {
          return _child;
        }
      }

      return null;
    }
    /**
    * 根据给定的路径数组，返回对应的节点
    * time complexity = O(n) / Linear
    * @param   {Array<Tsn>}    keys路径
    * @returns {TreeMap<T> | null}
    */

  }, {
    key: "containPath",
    value: function containPath(keys) {
      var node = this;

      var _iterator2 = _createForOfIteratorHelper(keys),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _key2 = _step2.value;
          node = node.contains(_key2);

          if (!node) {
            break;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return node;
    }
    /**
    * 从父亲节点中删除当前节点
    * time complexity = O(n) / Linear
    */

  }, {
    key: "removeFromParent",
    value: function removeFromParent() {
      var index = this.getIndexInParent();

      if (!this.parent) {
        return;
      }

      this.parent.children.splice(index, 1);
    }
    /**
    * 移动到某个位置
    * time complexity = O(1) / Linear
    * @param   {Number} toIndex 需要移动到的位置
    * @returns {Void}
    */

  }, {
    key: "insertToFromParent",
    value: function insertToFromParent(toIndex) {
      var curIndex = this.getIndexInParent(); // 如果没有父亲，或者父亲没有子节点，或者当前位置小于0

      if (!this.parent || !this.parent.children || curIndex < 0) {
        return;
      } // 父亲节点中删除当前元素


      this.removeFromParent(); // 如果超出了父亲的子节点数量，添加一个

      if (this.parent.children.length <= toIndex) {
        this.parent.children[toIndex] = this;
        return;
      } // 将当前节点插入到指定的位置


      this.parent.children.splice(toIndex, 0, this);
    }
    /**
    * 遍历指定节点下所有子节点的value数据,当前节点不计算在内
    * @param   {(node: TreeMap<T>) => any}     clearFunc      map方法
    * @param   {Boolean}                    currentNode    是否包含当前节点
    * @returns {Void}
    */

  }, {
    key: "forEach",
    value: function forEach(clearFunc) {
      var currentNode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (currentNode) {
        this.value = clearFunc(this);
      }

      for (var i = 0, n = this.children.length; i < n; i++) {
        var child = this.children[i];

        if (child) {
          child.value = clearFunc(child);
          child.forEach(clearFunc);
        }
      }
    }
  }]);

  return TreeMap;
}();
//# sourceMappingURL=tree.js.map