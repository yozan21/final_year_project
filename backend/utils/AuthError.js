export default class AuthError extends Error {
  constructor(message = "session expired", statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.clearAuthCookies = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
