import { assert, expect } from "chai";

import normal from "../../esm/types/normal";
import { schemaFieldFactory, schemaKeysFactory } from "../../esm/index";

describe("普通类型的解析", () => {
    it("解析普通类型的数据", () => {
        let schema = normal("test2#", {
            $id: "test2",
            type: "string",
            title: "测试的schema"
        });

        expect(schema.$id).eq("test2");
        assert.isNotNull(schemaFieldFactory.get("test2#"));
    });

    it("解析普通类型的数据1", () => {
        let schema = normal("test3#", {
            $id: "test3",
            $ref: "test1",
            type: "string",
            title: "测试的schema"
        });

        expect(schema.$ref).eq("test3test1");
        assert.isNotNull(schemaFieldFactory.get("test3#"));
    });

    // it("oneOf中的schema被替换成了正确的schema;数量为2；$ids = [test2,test1]", () => {
    //     expect(schema).to.be.a("object");
    //     expect(schema.oneOf.length).to.equal(2);
    //     expect(schema.oneOf[0].$ref).to.equal("test2#");
    //     expect(schema.oneOf[1].$ref).to.equal("test1#");
    // });

    // it("验证schemaFieldFactory中的key是否正确", () => {
    //     expect(schemaFieldFactory.has("test#")).to.equal(true);
    //     expect(schemaFieldFactory.has("test1#")).to.equal(true);
    //     expect(schemaFieldFactory.has("test2#")).to.equal(true);
    // });

    // it("验证schemaKeysFactory中的key是否正确", () => {
    //     expect(schemaKeysFactory.get("test")).to.equal("test#");
    //     expect(schemaKeysFactory.get("test1")).to.equal("test1#");
    //     expect(schemaKeysFactory.get("test2")).to.equal("test2#");
    // });
});
