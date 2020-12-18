/**
 * @file 工厂类
 */

import { hasOwnProperty } from "../utils";

/**
 * 工厂类
 * @class
 */
export class BaseFactory<T> {
    /**
     * 用来存放工厂实例
     * @protected
     * @type {{ [id: string]: T; }}
     * @memberof BaseFactory
     */
    protected store: { [id: string]: T; } = {};
    /**
     * 用来存放被锁定工厂实例
     * @private
     * @type {{ [id: string]: T; }}
     * @memberof BaseFactory
     */
    private _lock: { [id: string]: boolean; } = {};

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
    public add(name: string, instance: T, override = false): BaseFactory<T> {
        if (hasOwnProperty.call(this._lock, name) || (this.has(name) && !override)) {
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
    public has(key: string): boolean {
        return hasOwnProperty.call(this.store, key);
    }

    /**
     * 获取一个实例
     * @param {string} key  实例标志
     * @returns {T}         返回当前key对应的实例
     * @memberof BaseFactory
     */
    public get(key: string): T {
        if (this.has(key)) {
            return this.store[key];
        }

        return null as any;
    }

    /**
     * 锁定实例,锁定后不能删除和覆盖
     * @param {string} key  key
     * @memberof BaseFactory
     */
    public lock(key: string): void {
        if (this.has(key)) {
            this._lock[key] = true;
        }
    }

    /**
     * 解锁实例
     * @param {string} key  key
     * @memberof BaseFactory
     */
    public unLock(key: string): void {
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
    public forEach(func: (key: string, val: T) => any): void {
        if (!func) {
            return;
        }

        for (const key in this.store) {
            const element = this.store[key];

            if (func(key, element) === false) {
                break;
            }
        }
    }

    /**
     * 清空当前的hash
     * @memberof BaseFactory
     */
    public clear(): void {
        this.store = {};
        this._lock = {};
    }
}
