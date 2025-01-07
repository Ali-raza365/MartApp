import { config } from "../config/config.js";


const isProduction = config.env === 'production';

const errorHandler = (error, request, reply) => {

  const statusCode = error.statusCode || reply.statusCode || 500;
  const message = error.message || error?.msg || "Internal server error";

  const response = {
    message,
    stack: isProduction ? null : error.stack, // Hide stack trace in production
  };

  reply.status(statusCode).send(response);
};

// errorGenerator.js

const createError = (reply, statusCode, message, error = null) => {

   statusCode =statusCode || error.statusCode  || 500;
   message = message || error.message || error?.msg || "Internal server error";

  const err = {
    statusCode: statusCode || 500,
    error: message || "Internal server error",
    timestamp: new Date().toISOString(),
    success: false,
  };

  // Include stack trace only in development
  if (!isProduction && error?.stack) {
    err.stack = error?.stack
  }
  return reply.status(statusCode).send(err);
}




export { errorHandler, createError };