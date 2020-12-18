/**
 * 暴露hasOwnProperty方法
 */
export const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * 暴露toString方法
 */
export const toString = Object.prototype.toString;

export function typeOf(value: any) {
	if (null === value) {
		return "null";
	}

	let type = typeof value;

	if ("undefined" === type || "string" === type) {
		return type;
	}

	let typeString = toString.call(value);
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
export const isNumber = (n: any): boolean => {
	return typeOf(n) === "number";
};

/**
 * 判断参数是不是字符串
 * @param   {Any}      n    需要验证的参数
 * @returns {Boolean}
 */
export const isString = (n: any): boolean => {
	return typeOf(n) === "string";
};

/**
 * 判断参数是不是boolean
 * @param   {Any}      n    需要验证的参数
 * @returns {Boolean}
 */
export const isArray = (n: any): boolean => {
	return typeOf(n) === "array";
};

/**
 * 判断参数是不是boolean
 * @param   {Any}      n    需要验证的参数
 * @returns {Boolean}
 */
export const isBoolean = (n: any): boolean => {
	return typeOf(n) === "boolean";
};

/**
 * 解析keys
 * 1. 遍历keys中的元素，如果遇到-，则替换成数字
 * @param   {string[]} originKeys 需要做替换的数据路径
 * @param   {string[]} indexList  当前传递过来的indexList
 * @returns {string[]}
 */
export const mergeKeys = (originKeys: string[], indexList: number[] = []): string[] => {
	const arrayLevelCopy = [...indexList];
	const keys = originKeys.reverse().map((key: string) => {
		if (key === "-") {
			const index = arrayLevelCopy.pop();

			return (typeof index === "undefined" ? "" : index).toString();
		}

		return key;
	});

	return keys.reverse();
};
