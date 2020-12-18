# jsform

## 注意事项

- 接口设计符合规范和大众习惯，尽量让别人用起来简单易上手，易上手是指更符合直觉。
- 重写代码，排除特例，完美覆盖所有的情况

## 通用规范

> 注释

原则

- As short as possible（如无必要，毋增注释），尽量提高代码本身的清晰性、可读性
- As long as necessary（如有必要，尽量详细），合理的注释、空行排版等，可以让代码更易阅读、更具美感

> 单行注释

必须独占一行；// 后跟一个空格，缩进下一行被注释说明的代码一致。

> 多行注释

函数/方法注释必须包含函数说明（参照[jsdoc](http://usejsdoc.org/)注释），有参数和返回值时必须使用注释标识。
参数和返回值注释必须包含类型信息和说明。
当函数是内部函数，外部不可访问时，可以使用 @inner 标识。

> 文件注释

文件注释用于告诉不熟悉这段代码的读者这个文件中包含哪些东西。 应该提供文件的大体内容, 它的作者, 依赖关系和兼容性信息。如下:

```js

/**
 *	@description factory文件，提供了工厂模式的封装
 *	@author xiao.feng@jsform.com 
 */
```

> 命名

变量，使用Camel命名法，如果有初始值，则不写变量的类型。

```js
	let hasFactory = true;
```

私有属性、变量、方法和未引用变量以下划线_开头

```js
	let _privateMethod = (_unusedVariable: string): any => {
		// do something
	}
```

常量，使用全部字母大写，单词间下划线分割的命名方式

```js
	const PROPERTIES = "properties";
```

函数，使用Camel命名法，函数的参数使用Camel命名法

```js
	function mergeKeys(keys: string[], subscripts: number[], shouldMerge = false){
		// do something
	}
```

类, 使用 Pascal 命名法；枚举的属性，使用全部字母大写，单词间下划线分割命名方式

```js
	class BaseFactory {}

	const Methods = {
		GET: 1,
		POST: 2,
		PUT: 3,
		DELETE: 4,
		HEAD: 5,
		OPTIONS: 6
	};
```

由多个单词组成的 缩写词，在命名中，根据当前命名法和出现的位置，所有字母的大小写与首字母的大小写保持一致。

```js
	function XMLParser() {}
	function insertHTML(element,html) {}

	let httpRequest = new HTTPRequest();
```

> 命名语法

类名，使用名词。

```js
	class Engine {
		constructor(options: any){

		}
	}
```

boolean 类型的变量使用is或has开头

```js
	let isReady = false;
	let hasMoreComments = false;
```

Promise对象用动宾短语的进行时表达

```js
	let loadingData:Promise<any> = proxy.execute("q", "w", {});

	loadingData.then(callback);
```

> 接口命名规范

可读性强，见名晓意。尽量写全，不要用缩写，除非是下面列表中预定的（变量以表达清楚为目的，uglify会完成压缩体积工作），后续在补充

|常用词|说明|
|:-----:|:-----:|
|options|表示选项，不要用opts，config等|
|active|表示当前，不要用current，cur等|
|index|表示索引，不要用idx等|
|trigger|触点元素|
|triggerType|触发类型，方式|
|context|表示传入的this对象|
|object|不要用o，obj等|
|element|不要用el，elem等|
|length|不要用l，len|
|prev|previous的缩写|
|next|next下一个，与prev对应|
|constructor|不要用ctor|
|btn|button的缩写|

> True 和 False布尔表达式

类型检测优先使用 typeof。对象类型检测使用 instanceof。null 或 undefined 的检测使用 === null。

下面的布尔表达式都返回false

- null
- undefined
- 空字符串
- 0

但小心下面的，都返回true

- '0'字符串
- []空数组，用[].length来判断
- {}空对象，用isEmptyObject来判断

> 不要在Array上使用 for-in来遍历

for-in 循环只用于 object/map/hash 的遍历, 对 Array 用 for-in 循环有时会出错. 因为它并不是从 0 到 length - 1 进行遍历, 而是所有出现在对象及其原型链的键值。

> 二元和三元操作符

三元操作符用于替代 if 条件判断语句。

> && 和 ||，尽量避免使用

二元布尔操作符是可短路的, 只有在必要时才会计算到最后一项。