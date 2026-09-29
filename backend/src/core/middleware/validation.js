import { ZodError } from "zod";
import { ErrorResponse } from "../errors/error-handler.js";

export const validate = (schema) => {
  return async (req, res, next) => {
    try {
      const parsed = await schema.parseAsync(req.body);

      req.body = parsed;
      next();
    } catch (e) {
      if (e instanceof ZodError) {
        throw new ErrorResponse(e.issues[0].message, 400);
      }
      next(e);
    }
  };
};