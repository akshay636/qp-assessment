import Ajv from "ajv";
import normalize from "ajv-error-messages";
import Error from "ajv-errors";
import { ValidationError } from "../lib/exceptions/ValidationError";

// instantiating the AJV
const ajv = new Ajv({ allErrors: true, $data: true });

// TODO: Why this
Error(ajv);

/**
 * Validate given json against a schema
 * @param schema
 * @param data
 */
export const validate = async (schema: object, data: object): Promise<boolean> => {
    const test = ajv.compile(schema);
    try {
        if (!await test(data)) {
            throw new ValidationError("Validation Error", formatErrors(test.errors));
        }
    } catch (e) {
        e.errors.map((err) => {
            if (err.keyword === "required") {
                err.dataPath = err.params.missingProperty;
            } else if (err.keyword === "errorMessage") {
                err.dataPath = err.dataPath.replace("/", "");
            }
        });
        throw new ValidationError("Validation Error", formatErrors(e.errors));
    }
    return true;
};

const formatErrors = (errors: any[]) => {
    const errorsList = normalize(errors);
    if (Object.keys(errorsList.fields).length) {
        return Object.keys(errorsList.fields).reduce((acc, key) => {
            acc[key] = errorsList.fields[key][0];
            return acc;
        }, {});
    }
    return {};
};
