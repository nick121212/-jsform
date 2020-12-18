import { expect } from "chai";

import arrayResolve from "../../esm/types/array";

describe("数组类型的解析", () => {
    let schema, test;

    beforeEach(() => {
        test = {
            $id: "test",
            title: "测试oneof的schema",
            type: "array",
            items: {
                type: "string"
            }
        };

        schema = arrayResolve("test#", test);
    });

    it("测试数组的类型转换", () => {
        expect(schema).to.be.a("object");
        expect(schema.items).to.be.a("object");
        expect(schema.items.type).to.be.a("string");
        expect(schema.items.type).to.equal("string");
        // expect(schema.items.keys.join()).to.equal([ "-" ].join());
    });
});
