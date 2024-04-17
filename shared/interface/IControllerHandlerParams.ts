import { ERequestPayLoadTypes } from "../enums/ERequestPayloadTypes";
/**
 * This is a interface for control handler parameters.
 * @param schema optional
 * @param hasPermission optional
 * @param controller
 * @param schemaLookup optional
 * @param options optional
 */
export interface IControllerHandlerParams {
    schema?: object;
    hasPermission?: string;
    // tslint:disable-next-line: ban-types
    controller: Function;
    schemaLookup?: ERequestPayLoadTypes;
    options?: any;
}
