import { ZodError } from "zod";

export function translateError(error: Error | ZodError) {
  if (error.name === 'Error') {
    if (error.message === 'Short URL not found') {
      return {
        statusCode: 404,
        message: error.message,
      };
    }
    if (error.message === 'No token provided') {
      return {
        statusCode: 401,
        message: error.message,
      };
    }
  }
  if (error.name === 'ZodError') {
    const err = error as ZodError;
    const zodErrorMessage = parseZodErrorMessage(err);
    if (err.issues[0].message === 'Invalid url' || err.issues[0].message === 'Required') {
      return {
        statusCode: 400,
        message: zodErrorMessage,
      };
    }
    if (err.issues[0].message === 'Invalid token') {
      return {
        statusCode: 401,
        message: zodErrorMessage,
      };
    }
  }
  return {
    statusCode: 520,
    message: error.message,
  };
}

function parseZodErrorMessage(error: ZodError) {
  const errorMessage = error.issues[0].message;
  const errorPath = error.issues[0].path[0];
  return `${errorPath} ${errorMessage}`;
}
