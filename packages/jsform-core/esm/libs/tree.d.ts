export declare type Tsn = string | number;
/**
 * tree map struct
 * 这里用来记录数据的元数据信息
 * 元数据信息包括，isValid，isLoading，isShow，...etc
 */
export declare class TreeMap<T> {
    private key;
    value: any;
    readonly parent?: TreeMap<T> | undefined;
    children: TreeMap<T>[];
    /**
      * 构造函数
      * @param   {String}  key    当前节点的key
      * @param   {any}     value  当前节点的值
      * @param   {TreeMap<T>} parent 当前节点的父亲节点
      * @returns {Void}
      */
    constructor(key: string, value: any, parent?: TreeMap<T> | undefined);
    /**
    * 添加一个子元素
    * @param    {Array<Tsn>} keys  节点的路径，遍历keys来动态创建节点 example ["root","b"]  root -> b
    * @param    {any}        value 孩子的数据
    * @returns  {TreeMap<T>}
    */
    addChild(keys: Array<Tsn>, value?: any): TreeMap<T>;
    /**
   * 获取当前的key
   * 如果key是`-`,代表是数组，则转换成数组下标
   * time complexity = O(1) / Constant
   * @returns string
   */
    getKey(): string;
    /**
   * 获取当前节点的keys路径
   * time complexity = O(1) / Constant
   * @returns {string[]}
   */
    getCurrentKeys(): Array<Tsn>;
    /**
    * 获取当前节点在父节点中的下标索引
    * time complexity = O(1) / Constant
    * @returns {number}
    */
    getIndexInParent(): number;
    /**
    * 从当前节点查找是否存在节点
    * time complexity = O(n) / Linear
    * @param   {Tsn}     key 节点的数据
    * @returns {TreeMap<T>}
    */
    contains(key: Tsn): TreeMap<T> | null;
    /**
    * 根据给定的路径数组，返回对应的节点
    * time complexity = O(n) / Linear
    * @param   {Array<Tsn>}    keys路径
    * @returns {TreeMap<T> | null}
    */
    containPath(keys: Array<Tsn>): TreeMap<T> | null;
    /**
    * 从父亲节点中删除当前节点
    * time complexity = O(n) / Linear
    */
    removeFromParent(): void;
    /**
    * 移动到某个位置
    * time complexity = O(1) / Linear
    * @param   {Number} toIndex 需要移动到的位置
    * @returns {Void}
    */
    insertToFromParent(toIndex: number): void;
    /**
    * 遍历指定节点下所有子节点的value数据,当前节点不计算在内
    * @param   {(node: TreeMap<T>) => any}     clearFunc      map方法
    * @param   {Boolean}                    currentNode    是否包含当前节点
    * @returns {Void}
    */
    forEach(clearFunc: (node: TreeMap<T>) => any, currentNode?: boolean): void;
}
//# sourceMappingURL=tree.d.ts.map