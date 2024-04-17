import { Request, Response } from "express";
// import { Transaction } from "sequelize";

import { handleError } from "../helpers/handleError";
import { logger } from "../lib/logger";
import { validate } from "../validator/validate";
import { getTransaction } from "../helpers/getTransaction";
// import { IControllerParams } from "../interface/IControllerParams";
import { IControllerHandlerParams } from "../interface/IControllerHandlerParams";
import { Created, Ok } from "../lib/response";


/**
 * Controller handler method which validates data with defined schema, call controller and
 * handles the exception.
 * @param param
 */

export const invokeControllerRequest = ({
  schema,
  controller,
  options,
}: IControllerHandlerParams) => {
  return async (req: Request|any, res: Response) => {
    // Instantiate a trsnsaction
    let transaction = null;

    
    try {
      // define two empty variable user, payload
      const user:any = {};
      let payload:any = {};
      // extracting values from request and storing it in payload
      payload = { ...(req.body ? req.body : {}), ...req.params, ...req.query };
      // if the request have a user then extract the values and store it in user
      if (req.user) {
        user["uuid"] = req.user.uuid;
        user["role"] = req.user.role;
        user["userType"] = req.user.userType;
      }

      // Validate the user input
      if (schema) {
        await validate(schema, payload);
      }

      let createTransaction = false;
      if (
        options &&
        options.hasOwnProperty("transaction") &&
        options.transaction === true
      ) {
        createTransaction = true;
      }
      // create a transaction if the createTransaction is true
      if (createTransaction) {
        transaction = await getTransaction();
      }

      let params = {
        args: {
          params: req.params,
          queryString: req.query,
          body: req.body
        },
        input: payload,
        transaction,
        user,
        req,
        token: req.get("Authorization"),
      };
      if (createTransaction) {
        params = { ...params, transaction };
      }
      // call the controller with the params
      const response = await controller(params);

      // Return response to the client
      const method = req.method === "POST" && response.created ? Created : Ok;
      method(res, response.message, response.payload);
      // method(res, response.message, response.payload);
    } catch (e) {
      // if any error occured at any time of the complete flow then rollbacjk the transaction
      if (transaction) {
        await transaction.rollback();
      }
      console.log("..e..", e);
      logger.error(e); // Log the error for debugging purpose
      handleError(e, res);
    }
  };
};
