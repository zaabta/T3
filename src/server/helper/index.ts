import { type Response } from "y/types";

export const successResponse = function (
  status: number = 200,
  messages: string = "",
  data: any[] | object = [],
  extras: object = {}
): Response {
  let response: Response = {
    status,
    success: true,
    data ,
    messages,
    time: Date.now(),
  };
  response = { ...response, ...extras };
  return response;
};

export const errorResponse = function (
  status: number = 400,
  messages: string = "",
  data: any[] = []
) {
  var response: Response = {
    status,
    success: false,
    data,
    messages,
    time: Date.now(),
  };
  return response;
};

export const unauthorized = () => {
  return errorResponse(401, "unauthorized");
};

export const unauthenticated = () => {
  return errorResponse(401, "unauthenticated, please login first");
};

export const failedWithMessage = (msg: string) => {
  return errorResponse(400, msg);
};

export const serverError = () => {
  return errorResponse(500, "something went wrong, please try again later.");
};

export const forbidden = () => {
  return errorResponse(403, "forbidden");
};

export const notAcceptable = () => {
  return errorResponse(406, "Not Acceptable");
};

export const successWithMessage = (msg: string, data: any[] | object = []) => {
  return successResponse(200, msg, data);
};

export const success = (msg?: string, data: any[] | object = []) => {
  return successResponse(200, msg, data);
};
