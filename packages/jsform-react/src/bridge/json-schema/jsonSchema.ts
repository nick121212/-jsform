import {
    UiSchema,
    resolve,
    merge,
    JsFormJsonSchema,
    schemaFieldFactory,
    schemaKeysFactory,
} from "jsform-core";
import { JSONSchema6 } from "json-schema";

// import { JSFormError, JSFormValidateError } from "../../models/error";
import { BaseBridge } from "../base";
import generateId from "../../utils/generateId";

console.log(schemaFieldFactory, schemaKeysFactory);

export class JsonSchemaBridge implements BaseBridge {
    private schemaResolved: JsFormJsonSchema;
    private schemaId: string = "";

    public constructor(private schema: JSONSchema6) {
        this.schemaId = this.schema.$id ?? generateId();

        schema.$id = this.schemaId;

        this.schemaResolved = resolve(schema);
    }

    getField(name?: string): UiSchema | undefined {
        const path = (name ? [this.schemaId, name] : [this.schemaId]).join("/");

        if (!schemaKeysFactory.has(path)) {
            return;
        }

        return schemaFieldFactory.get(schemaKeysFactory.get(path)) as any;
    }

    getInitialValue(name: string) {}

    getSubFields(name: string) {
        const field = this.getField(name);

        return merge(field?.schemaPath!, field);
    }

    getValidator(model: any) {}
}
