import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { ExtractJwt } from "passport-jwt";
import '../lib/strategies/passportPrimaryStrategy'
import { logger } from "../lib/logger";

import { TOKEN_NOT_FOUND } from "../constants/httpErrorMessages";
import { UnAuthorized, BadRequest, Forbidden } from "../exception/exceptionResponse";

/**
 * Method which authenticates a user based on the jwt header
 * @param req
 * @param res
 * @param next
 */

interface RequestProps extends Request {
  user: any;
  url: string;
}

interface ResponseProps extends Response {
  status: any;
}

export default function authBarrier(
  req: RequestProps,
  res: ResponseProps,
  next: NextFunction
) {
  const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
  if (!token) {
    BadRequest(res, TOKEN_NOT_FOUND);
    return;
  }

  passport.authenticate(
    "user_local",
    { session: false },
    (err, user: any) => {
      if (err) {
        Forbidden(res);
        return;
      }
      if (!user) {
        UnAuthorized(res);
        return;
      }

      logger.debug("Authenticate-middleware 11 -> User role ->", user.role);

      req.user = user;
      next();
    }
  )(req, res, next);
}
