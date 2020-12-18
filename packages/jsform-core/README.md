# @jsform/core

用于解析JsonSchema，为SchemaForm提供支持。

## 依赖项

* jsonschema

## Schema DEMO

```js
 let schema = {
    type: "object",
    $id: "dnd-oneof",
    title: "oneof测试schema",
    default: {},
    required: ["value"],
    properties: {
        type: {
            type: "number",
            enum: [1, 2, 3, 4],
            title: "类型选择",
            description: "1:数字,2:字符串,3:bool,4:object"
        },
        value: {
            oneOf: [{
                $id: "dnd-oneof-number",
                type: "number",
                title: "这是一个数字类型"
            }, {
                $id: "dnd-oneof-string",
                type: "string",
                title: "这是一个字符串类型"
            }, {
                $id: "dnd-oneof-boolean",
                type: "boolean",
                title: "这是一个bool类型"
            }, {
                $id: "dnd-oneof-object",
                type: "object",
                title: "这是一个object类型",
                default: {},
                required: ["a", "b"],
                properties: {
                    a: {
                        type: "string",
                        default: "nick"
                    },
                    b: {
                        type: "boolean",
                        default: true
                    }
                }
            }]
        }
    }
};
```

## API

### schemaKeysFactory

存储了所有key与schemaKey的对应关系

> example: 'dnd-oneof-object/a': 'dnd-oneof-object#/properties/a',

### schemaFieldFactory

存储了schemaKey对应的schema

example:

```js
{
    'dnd-oneof-object#/properties/a': {
        type: 'string',
        default: 'nick',
        schemaPath: 'dnd-oneof-object#/properties/a'
    }
}
```

### schemaKeyWordFactory

> 所有的keyword处理方式。目前有ref和oneOf；

* ref: 处理schema中的$ref关键字
* oneOf: 处理schema中的oneOf关键字
* anyOf: 处理schema中的anyOf关键字
* definitions: 处理schema中的definitions关键字

### schemaTypeFactory

> schema类型的处理方式

* array     schema中数组类型
* object    schema中的对象类型
* undefined schema中的其他简单类型(string,number,integer,any,boolean)

```js
schemaTypeFactory.add("array", array);
schemaTypeFactory.add("string", none);
schemaTypeFactory.add("undefined", none);
schemaTypeFactory.add("number", none);
schemaTypeFactory.add("null", none);
schemaTypeFactory.add("any", none);
schemaTypeFactory.add("integer", none);
schemaTypeFactory.add("boolean", none);
schemaTypeFactory.add("object", object);
```

### resolve

```typescript
(schema: JSONSchema6, $id = "") => JSONSchema6
```

> 解析schema中的所有字段，存储到【schemaFieldFactory】中。

### getSchemaFromKeyPath

> 通过数据路径来查找schema

```typescript
(keyPath: string, originKeyPath?: string) => UiSchema
```

### getSubSchemas

> 通过数据路径来查找所有的子schema

``` typescript
(keyPath: string): UiSchema[]
```

## 基础使用

> 定义Schema

``` js
const schema: JSONSchema6 = {
    type: "object",
    $id: "design",
    required: ["name", "dsModelIds"],
    properties: {
        name: {
            type: "string",
            title: "面板名称"
        },
        description: {
            type: "string",
            title: "面板详情"
        },
        appType: {
            type: "string",
            title: "应用类型"
        },
        dsModelIds: {
            type: "array",
            items: {
                type: "number"
            }
        },
        dsModelData: {
            type: "object",
            properties: {
                data: {
                    type: "object"
                },
                ids: {
                    type: "object"
                }
            }
        },
        infoOptions: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    label: {
                        type: "string"
                    },
                    data: {
                        type: "object"
                    },
                    infoOptions: {
                        $ref: "design#/properties/infoOptions"
                    }
                }
            }
        }
    }
};

resolve(schema);

console.log("design: ", getSchemaFromKeyPath("design"));
console.log("design/dsModelIds/-: ", getSchemaFromKeyPath("design/dsModelIds/-"));

```

## 命令

* ```npm test``` 测试命令
* ```npm run build``` 打包命令

## License

[MIT](LICENSE.md)