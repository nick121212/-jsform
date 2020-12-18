import { assert, expect } from "chai";

import { resolve } from "../../esm/index";
import { getSchemaId, getDataKeysBySchemaPath } from "../../esm/libs/resolve";

describe("测试resolve文件", () => {
    it("getSchemaId方法", () => {
        expect(getSchemaId("test#/properties/name")).to.equal("test");
        expect(getSchemaId("test#/properties/names/items")).to.equal("test");
        expect(getSchemaId("")).eq("");
    });

    it("getDataKeysBySchemaPath方法", () => {
        expect(getDataKeysBySchemaPath("test#/properties/name").join(".")).to.equal("name");
        expect(getDataKeysBySchemaPath("test#/properties/name/items/properties/b").join(".")).to.equal("name.-.b");

        expect(getDataKeysBySchemaPath("test#/properties/name", true).join(".")).to.equal("test.name");
        expect(getDataKeysBySchemaPath("test#/properties/name/items/properties/b", true).join(".")).to.equal("test.name.-.b");
    });

    it("resolve方法测试，返回正确的schema", () => {
        let schema = resolve({
            $id: "test",
            type: "string"
        });

        expect(schema).to.be.a("object");
    });

    it("resolve方法测试，返回正确的schema", () => {
        let schema = resolve(
            {
                type: "string"
            },
            "test"
        );

        expect(schema).to.be.a("object");
    });

    it("resolve方法测试，返回正确的schema", () => {
        assert.throw(() => {
            resolve({
                $id: "test",
                type: [ "string" ]
            });
        });
    });

    it("resolve方法测试，返回正确的schema", () => {
        let schema = resolve({
            $id: "test",
            type: "object",
            properties: {
                a: { type: "string" }
            }
        });

        expect(schema).to.be.a("object");
    });

    it("resolve方法测试，返回错误信息：'id is required by fx-schema-form-core'", () => {
        assert.throw(() => {
            resolve({
                type: "string"
            });
        });
    });
});
