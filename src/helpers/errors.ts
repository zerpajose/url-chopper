import { ZodError } from "zod";

export function translateError(error: Error | ZodError) {
  if (error.name === 'Error') {
    if (error.message === 'Short URL not found') {
      return {
        statusCode: 404,
        message: error.message,
      };
    }
  }
  if (error.name === 'ZodError') {
    const err = error as ZodError;
    if (err.issues[0].message === 'Invalid url') {
      return {
        statusCode: 400,
        message: err.issues[0].message,
      };
    }
  }
  return {
    statusCode: 520,
    message: error.message,
  };
}
