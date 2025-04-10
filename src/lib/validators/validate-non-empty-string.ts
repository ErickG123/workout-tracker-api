import { EmptyString } from "../../use-cases/errors/empty-string.error";

export function validateNonEmptyString(value: string, fieldName: string) {
    if (!value || value.trim() === "") {
        throw new EmptyString(`${fieldName} cannot be an empty string`);
    }
}
