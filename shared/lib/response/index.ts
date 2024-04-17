import { Response } from "express";
import {
    BAD_REQUEST, CREATED, FORBIDDEN,
    INTERNAL_SERVER_ERROR, NO_CONTENT, NOT_FOUND, OK, UNPROCESSED_ENTITY, UN_AUTHORIZED,
} from '../../constants/httpStatusCodes'

import { isObject, isArrayNotEmpty } from "../../helpers/validChecker";
import { IResponsePayload } from "../../interface/IResponsePayload";


export const Created = (res: Response|any, message: string, payload: IResponsePayload) => {
    return respond(res, CREATED, message, payload);
};

export const Ok = (res: Response|any, message: string, payload: IResponsePayload | IResponsePayload[]) => {
    return respond(res, OK, message, payload);
};

export const NotFound = (res: Response|any, message: string) => {
    return respond(res, NOT_FOUND, message);
};

export const UnAuthorized = (res: Response|any, message: string) => {
    return respond(res, UN_AUTHORIZED, message);
};

export const UnprocessedEntity = (res: Response|any, message: string, payload: IResponsePayload) => {
    return respond(res, UNPROCESSED_ENTITY, message, payload);
};

export const BadRequest = (res: Response|any, message: string) => {
    return respond(res, BAD_REQUEST, message);
};

export const NoContent = (res: Response|any, message: string) => {
    return respond(res, NO_CONTENT, message);
};

export const Forbidden = (res: Response|any, message: string) => {
    return respond(res, FORBIDDEN, message);
};

export const InternalServerError = (res: Response|any, message: string) => {
    return respond(res, INTERNAL_SERVER_ERROR, message);
};

const respond = (res: Response|any, code: number, message: string, payload?: IResponsePayload | IResponsePayload[]) => {
    const responseInfo: { message: string, payload?: IResponsePayload } = { message };

    if (isNonEmptyObject(payload) || Array.isArray(payload)) {
        responseInfo.payload = payload;
    }
    return res.status(code).send(responseInfo);
};

const isNonEmptyObject = (value: any) => {
    return value && isObject(value) && isArrayNotEmpty(Object.keys(value));
};
