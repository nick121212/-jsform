import { expect } from "chai";

import anyOf from "../../esm/keywords/anyof";
import { resolve } from "../../esm/libs/resolve";

describe("key word of anyOf", () => {
    let testSchema = {},
        noneAnyOf = {
            $id: "test1",
            type: "string"
        };

    beforeEach(() => {
        testSchema = {
            $id: "test",
            title: "测试schema",
            anyOf: [
                {
                    $id: "number",
                    type: "number"
                },
                {
                    type: "string",
                    $id: "string"
                }
            ]
        };

        // resolve();
    });

    it("解析anyOf关键字", () => {
        let schema = anyOf("", testSchema);

        expect(schema).to.be.a("object");
        expect(schema.anyOf.length).to.equal(2);
        expect(schema.anyOf[0].type).to.equal("number");
        expect(schema.anyOf[1].type).to.equal("string");
    });

    it("解析anyOf关键字", () => {
        let schema = anyOf("test2", Object.assign({}, testSchema, { $id: "" }));

        expect(schema).to.be.a("object");
        expect(schema.anyOf.length).to.equal(2);
        expect(schema.anyOf[0].type).to.equal("number");
        expect(schema.anyOf[1].type).to.equal("string");
    });

    it("不解析anyOf关键字", () => {
        let schema = anyOf("", noneAnyOf);

        expect(schema).to.be.a("object");
        expect(schema.anyOf).to.equal(undefined);
    });
});
