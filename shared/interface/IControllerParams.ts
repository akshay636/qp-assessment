import { Request } from "express";
import { IDynamicObject } from "./IDynamicObject";
/**
 * This is a interface for controller parameters.
 * @param args
 * @param input - T
 * @param transaction
 * @param req
 * @param user
 */

interface RequestProps extends Request {
  token?: string
}

export interface IControllerParams<T> {
  args: {
    params: IDynamicObject,
    queryString: IDynamicObject,
    body: IDynamicObject,
  };
  input?: T|any;
  transaction: any |null;
  req: RequestProps;
  user: IAuthorizedUser;
  token: string;
}

export interface IAuthorizedUser {
  uuid: string;
  role: string;
  userType: string;
}
