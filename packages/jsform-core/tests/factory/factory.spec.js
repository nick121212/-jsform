import { assert, expect } from "chai";

import { schemaTypeFactory, schemaFieldFactory, schemaKeysFactory, schemaKeyWordFactory } from "../../esm/factory/factory";

describe("测试factory文件", () => {
    it("拥有4个对象", () => {
        expect(schemaTypeFactory).to.be.a("object");
        expect(schemaFieldFactory).to.be.a("object");
        expect(schemaKeysFactory).to.be.a("object");
        expect(schemaKeyWordFactory).to.be.a("object");
    });
});
