import { JsFormJsonSchema } from "./jsonschema";

export interface UiSchema extends JsFormJsonSchema {
    key: string;
    keys?: Array<string | number>;
    originKeys?: Array<string | number>;
    children?: Array<UiSchema | string>;
    refKeys?: string[];
}
