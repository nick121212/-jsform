/**
 * @file 工厂类
 */
/**
 * 工厂类
 * @class
 */
export declare class BaseFactory<T> {
    /**
     * 用来存放工厂实例
     * @protected
     * @type {{ [id: string]: T; }}
     * @memberof BaseFactory
     */
    protected store: {
        [id: string]: T;
    };
    /**
     * 用来存放被锁定工厂实例
     * @private
     * @type {{ [id: string]: T; }}
     * @memberof BaseFactory
     */
    private _lock;
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
    add(name: string, instance: T, override?: boolean): BaseFactory<T>;
    /**
     * 是否存在key值
     * @param {string} key key值
     * @returns {boolean} 是否存在
     * @memberof BaseFactory
     */
    has(key: string): boolean;
    /**
     * 获取一个实例
     * @param {string} key  实例标志
     * @returns {T}         返回当前key对应的实例
     * @memberof BaseFactory
     */
    get(key: string): T;
    /**
     * 锁定实例,锁定后不能删除和覆盖
     * @param {string} key  key
     * @memberof BaseFactory
     */
    lock(key: string): void;
    /**
     * 解锁实例
     * @param {string} key  key
     * @memberof BaseFactory
     */
    unLock(key: string): void;
    /**
     * 遍历所有的元素
     * @param {(key: string, val: T) => any} func 遍历方法
     * @returns {void}
     * @memberof BaseFactory
     */
    forEach(func: (key: string, val: T) => any): void;
    /**
     * 清空当前的hash
     * @memberof BaseFactory
     */
    clear(): void;
}
//# sourceMappingURL=factory.d.ts.map