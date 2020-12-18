let schema = {
    $id: "period",
    type: "object",
    default: {},
    title: "周期性参数-period",
    properties: {
        dataType: { type: "string" },
        initialValue: { type: "string" },
        types: {
            type: "array",
            items: {
                type: "string",
            },
        },
        gropus: {
            type: "array",
            items: {
                $ref:"period#"
            },
        },
        periodGap: {
            type: "object",
            required: ["value", "unit"],
            properties: {
                value: { type: "number" },
                unit: { type: "string" },
            },
        },
    },
};

export { schema };
