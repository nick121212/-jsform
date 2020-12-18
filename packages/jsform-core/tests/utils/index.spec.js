import { expect } from "chai";
import { isArray, isNumber, isString, mergeKeys, typeOf } from "../../esm/utils/index";

describe("工具方法测试用例", () => {
    it("isArray", () => {
        expect(isArray).to.be.a("function");

        expect(isArray([])).eq(true);
        expect(isArray()).eq(false);
        expect(isArray([ 1, 2, 3 ])).eq(true);
        expect(isArray(1)).eq(false);
        expect(isArray(true)).eq(false);
        expect(isArray({})).eq(false);
        expect(isArray(null)).eq(false);
        expect(isArray(undefined)).eq(false);
    });

    it("isString", () => {
        expect(isString).to.be.a("function");

        expect(isString("")).eq(true);
        expect(isString([])).eq(false);
        expect(isString()).eq(false);
        expect(isString([ 1, 2, 3 ])).eq(false);
        expect(isString(1)).eq(false);
        expect(isString(true)).eq(false);
        expect(isString({})).eq(false);
        expect(isString(null)).eq(false);
        expect(isString(undefined)).eq(false);
    });

    it("typeOf", () => {
        expect(typeOf).to.be.a("function");

        expect(typeOf("boolean")).eq("string");
        expect(typeOf(true)).eq("boolean");
        expect(typeOf(1)).eq("number");
        expect(typeOf({})).eq("object");
        expect(typeOf(new Date())).eq("date");
        expect(typeOf([])).eq("array");
        expect(typeOf(null)).eq("null");
        expect(typeOf(function() {})).eq("function");
        expect(typeOf(/\D/gi)).eq("regexp");
        expect(typeOf(undefined)).eq("undefined");

        expect(
            typeOf({
                nodeType: 3,
                nodeValue: ""
            })
        ).eq("whitespace");
        expect(
            typeOf({
                nodeType: 3,
                nodeValue: "dd"
            })
        ).eq("textnode");

        expect(
            typeOf({
                nodeType: 5
            })
        ).eq("element");

        expect(typeOf(new Map())).eq("unknow");
    });

    it("isNumber", () => {
        expect(isNumber).to.be.a("function");

        expect(isNumber([])).eq(false);
        expect(isNumber()).eq(false);
        expect(isNumber(1)).eq(true);
        expect(isNumber(true)).eq(false);
        expect(isNumber({})).eq(false);
        expect(isNumber(null)).eq(false);
        expect(isNumber(undefined)).eq(false);
    });

    it("mergeKeys", () => {
        expect(mergeKeys).to.be.a("function");

        expect(mergeKeys([ "a", "b" ]).join(".")).eq("a.b");
        expect(mergeKeys([ "a", "-", "b" ]).join(".")).eq("a..b");
        expect(mergeKeys([ "a", "-", "b" ], [ 0 ]).join(".")).eq("a.0.b");
        expect(mergeKeys([ "a", "-", "b", "-" ], [ 0, 2 ]).join(".")).eq("a.0.b.2");
    });
});
