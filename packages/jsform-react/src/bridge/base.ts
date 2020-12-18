import { UiSchema } from "jsform-core";
import { JSFormError, JSFormValidateError } from "../models/error";

export interface BaseBridge {
    // getError: (name: string, error: JSFormValidateError) => JSFormError;

    // getErrorMessage: (
    //     name: string,
    //     error: JSFormValidateError
    // ) => string | undefined;

    // getErrorMessages: (error: JSFormValidateError) => string[];

    getField: (name: string) => UiSchema | undefined;

    getInitialValue: (name: string) => any;

    getSubFields: (name: string) => UiSchema[];

    getValidator: (model: any) => any;
}
