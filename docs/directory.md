### 一.  整体外框目录

``` js
├── docs                          // 相关文档
│   └── directory.md              // 整体目录结构
├── lerna.json                    //lerna 配置文件
├── package.json  
└── packages 				      //主包内容
    ├── jsform-core				  //核心库
    ├── jsform-data				  //数据处理库
    ├── jsform-react			  //react表单生成库
    ├── jsform-react-theme-antd   //antd样式库
    ├── jsform-utils			  //工具库
    └── jsform-validate 		  //校验库

```
---- 
###  二. 主包内容介绍
 >  1.  jsform-core : 核心库 ，jsonshema 解析工具库，是对对象的操作
- 不同类型的格式解析，比如说数组，对象等
-  对路径的转换， 将schemapath转换为数据准确的json路径
-  关键字解析

> 2.  jsform-data：数据处理
-  对数据的增删改查
-  数据通知页面更新、对应监听change事件
- data、meta
> 3. jsform-react：react表单生成库， 根据配置生成表单
- 提出Template、field、组件 概念，具体实现来源于theme库
-  根据概念及theme库生成页面
> 4. jsform-react-theme-antd：antd样式库
- Template、field、组件封装
> 5. jsform-utils ：工具库

> 6. jsform-validate：校验库


