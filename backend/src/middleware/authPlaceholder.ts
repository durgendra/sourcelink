import type { NextFunction, Request, Response } from "express";

export const authPlaceholder = (_req: Request, _res: Response, next: NextFunction) => {
  next();
};
