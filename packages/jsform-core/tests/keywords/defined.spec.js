import { expect } from "chai";

import defined from "../../esm/keywords/defined";

describe("key word of definitions", () => {
    const testSchema = {
        $id: "test",
        type: "object",
        title: "测试的schema",
        definitions: {
            dt: {
                type: "string",
                title: "测试的定义"
            }
        },
        properties: {
            dt: {
                $ref: "test#/definitions/dt"
            }
        }
    };

    it("使用definitions关键字", () => {
        let schema = defined("", testSchema);

        expect(schema).to.be.a("object");
        // expect(schemaKeysFactory.has("test/definitions/dt")).to.eq(true);
        // expect(schemaKeysFactory.get("test/definitions/dt")).to.eq("test#/definitions/dt");
    });

    it("不使用definitions关键字", () => {
        let schema = defined("", Object.assign({}, testSchema, { definitions: null }));

        expect(schema).to.be.a("object");
        // expect(schemaKeysFactory.has("test/definitions/dt")).to.eq(true);
        // expect(schemaKeysFactory.get("test/definitions/dt")).to.eq("test#/definitions/dt");
    });
});
