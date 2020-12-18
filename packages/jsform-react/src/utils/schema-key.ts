import { UiSchema } from "jsform-core";

/**
 * get the key from json-schema path
 *
 * @export
 * @param {UiSchema} schema            当前的scehma
 * @param {number[]} [indexArray=[]]   index列表
 * 
 * @example
 *  getScehmaKey({
        keys: ["types", "-"],
        type: "string"
 *  }, [0]) => types.0
 * @returns { string | undefined }
 */
export function getSchemaKey(
    schema: UiSchema,
    indexArray: number[] = []
): string | undefined {
    const arrayLevelCopy = indexArray.concat([]);

    return schema.keys
        ?.concat([])
        .reverse()
        .map((key: string | number) => {
            if (key === "-") {
                if (!arrayLevelCopy.length) {
                    throw new Error("the length of indexArray is too short!");
                }

                return arrayLevelCopy.pop();
            }

            return key;
        })
        .reverse()
        .join(".");
}
