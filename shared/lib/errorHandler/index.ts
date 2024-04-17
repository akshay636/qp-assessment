import { Response } from "express";
import {BadRequest , InternalServerError, NoContent, NotFound, UnAuthorized, UnprocessedEntity } from  "../response"


export const handleError = (error: any, res: Response) => {
    if (error.name === "HttpNotFound") {
        return NotFound(res, error.message);
    }

    if (error.name === "HttpBadRequest") {
        return BadRequest(res, error.message);
    }

    if (error.name === "HttpUnAuthorized") {
        return UnAuthorized(res, error.message);
    }

    if (error.name === "HttpNoContent") {
        return NoContent(res, error.message);
    }

    if (error.name === "ValidationError") {
        let er = 'Unprocessed Entity'
        if (error.errors['email']) {
            er = error.errors['email']
        } else if (error.errors['phone']) {
            er = error.errors['phone']
        } else if (error.errors['otp']) {
            er = error.errors['otp']
        } else if (error.errors, 'password') {
            er = error.errors['password']
        }
        return UnprocessedEntity(res, er, error.errors);
    }
    return InternalServerError(res, "Internal Server Error");
};
