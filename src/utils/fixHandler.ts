import { Request, Response, NextFunction, RequestHandler } from "express";

export const fixHandler = (
  middlewares: RequestHandler[],
  handler: (req: Request, res: Response, next: NextFunction) => Promise<any>
): RequestHandler[] => {
  return [
    ...middlewares,
    (req, res, next) => {
      handler(req, res, next).catch(next);
    },
  ];
};
