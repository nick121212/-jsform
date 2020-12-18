import { assert, expect } from "chai";

import ref from "../../esm/keywords/ref";

describe("key word of ref", () => {
    let testSchema = {
        $id: "test",
        title: "测试oneof的schema",
        $ref: "test2#"
    };

    it("有ref关键字，有$id关键字，ref被替换成了对应的JsonSchema", () => {
        let schema = ref("", testSchema);

        expect(schema).to.be.a("object");
    });

    it("有ref关键字，没有$id关键字，ref被替换成了对应的JsonSchema", () => {
        let schema = ref("test2#", {
            title: "测试oneof的schema",
            $ref: "test2#"
        });

        expect(schema).to.be.a("object");
    });

    it("没有ref关键字的情况", () => {
        let schema = ref("", {
            $id: "test",
            title: "测试oneof的schema",
            type: "string"
        });

        expect(schema).to.be.a("object");
    });
});
