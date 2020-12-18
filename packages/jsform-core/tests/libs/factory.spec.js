import { assert, expect } from "chai";

import { BaseFactory } from "../../esm/libs/factory";

describe("测试Factory类", () => {
    let factory = new BaseFactory();

    beforeEach(() => {
        factory = new BaseFactory();
    });

    it("Factory类是一个对象, 拥有get，add，has，lock，unlock，forEach，clear方法", () => {
        expect(factory).to.be.a("object");
        expect(factory.get).to.be.a("function");
        expect(factory.add).to.be.a("function");
        expect(factory.has).to.be.a("function");
        expect(factory.lock).to.be.a("function");
        expect(factory.unLock).to.be.a("function");
        expect(factory.forEach).to.be.a("function");
        expect(factory.clear).to.be.a("function");
    });

    it("Factory测试add,has,get功能", () => {
        expect(factory.add("1", {})).to.equal(factory);
        expect(factory.add("1", {}, true)).to.equal(factory);
        expect(factory.add("1", {})).to.equal(factory);

        expect(factory.has("1")).to.equal(true);
        expect(factory.has("2")).to.equal(false);
        expect(factory.get("1")).to.be.a("object");

        expect(factory.get("2")).to.eq(null);
    });

    it("Factory测试lock,unlock功能", () => {
        factory.add("3");
        factory.lock("3");

        factory.lock(4);
        factory.unLock(4)

        expect(factory.add("3", true, true)).to.equal(factory);
        factory.unLock("3");
        expect(factory.add("3", {}, true)).to.equal(factory);
    });

    it("Factory测试clear,forEach功能", () => {
        let loopCount = 0;

        factory.add("1", { a: 1 });
        factory.add("2", { a: 2 });
        factory.add("3", { a: 3 });

        factory.forEach((k, v) => {
            expect(v).to.be.a("object");
            expect(k).to.be.a("string");
            if (++loopCount > 2) {
                return false;
            }
        });

        factory.forEach();

        expect(loopCount).to.equal(3);

        factory.clear();
        loopCount = 0;
        factory.forEach((k, v) => {
            loopCount++;
        });
        expect(loopCount).to.equal(0);
    });
});
