export interface JSFormError extends Error {}

export interface JSFormValidateError extends Error {
    details: JSFormError[];
}
