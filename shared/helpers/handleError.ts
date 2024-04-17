import { Response } from "express";
import { BadRequest, InternalServerError, NoContent, NotFound, UnAuthorized } from '../lib/response';

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
    return InternalServerError(res, "Internal Server Error");
};
