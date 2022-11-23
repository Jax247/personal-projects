import { Session } from 'express-session';
import { Request, Response } from "express";
export type PostArgs = {
  id: number;
  title: string;
  text: string;
};

export type Error = {
  success: boolean,
  error: string,
  errorCode: string,
  context: string,
}

export type Context = {
  req: Request & { session?: Session };
  res: Response;
};
