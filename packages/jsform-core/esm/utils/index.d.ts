/**
 * 暴露hasOwnProperty方法
 */
export declare const hasOwnProperty: (v: string | number | symbol) => boolean;
/**
 * 暴露toString方法
 */
export declare const toString: () => string;
export declare function typeOf(value: any): "string" | "undefined" | "object" | "function" | "number" | "boolean" | "array" | "null" | "date" | "regexp" | "textnode" | "whitespace" | "element" | "unknow";
/**
 * 判断参数是不是数字
 * @param   {Any}      n    需要验证的参数
 * @returns {Boolean}
 */
export declare const isNumber: (n: any) => boolean;
/**
 * 判断参数是不是字符串
 * @param   {Any}      n    需要验证的参数
 * @returns {Boolean}
 */
export declare const isString: (n: any) => boolean;
/**
 * 判断参数是不是boolean
 * @param   {Any}      n    需要验证的参数
 * @returns {Boolean}
 */
export declare const isArray: (n: any) => boolean;
/**
 * 判断参数是不是boolean
 * @param   {Any}      n    需要验证的参数
 * @returns {Boolean}
 */
export declare const isBoolean: (n: any) => boolean;
/**
 * 解析keys
 * 1. 遍历keys中的元素，如果遇到-，则替换成数字
 * @param   {string[]} originKeys 需要做替换的数据路径
 * @param   {string[]} indexList  当前传递过来的indexList
 * @returns {string[]}
 */
export declare const mergeKeys: (originKeys: string[], indexList?: number[]) => string[];
//# sourceMappingURL=index.d.ts.map