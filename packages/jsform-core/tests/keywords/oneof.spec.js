import { expect } from "chai";

import oneOf from "../../esm/keywords/oneof";

describe("key word of oneOf", () => {
    let testSchema = {},
        noneAnyOf = {
            $id: "test1",
            type: "string"
        };

    beforeEach(() => {
        testSchema = {
            $id: "test",
            title: "测试schema",
            oneOf: [
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
    });

    it("解析oneOf关键字", () => {
        let schema = oneOf("", testSchema);

        expect(schema).to.be.a("object");
        expect(schema.oneOf.length).to.equal(2);
        expect(schema.oneOf[0].type).to.equal("number");
        expect(schema.oneOf[1].type).to.equal("string");
    });

    it("不解析anyOf关键字", () => {
        let schema = oneOf("", noneAnyOf);

        expect(schema).to.be.a("object");
        expect(schema.oneOf).to.equal(undefined);
    });
});
