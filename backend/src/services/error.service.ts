import type { Context } from "elysia"

export class HttpError extends Error {
  constructor(
    public statusCode: number,
    public errorCode: string,
    message: string,
    public details?: any,
  ) {
    super(message)
    this.name = "HttpError"
  }
}

// 4xx Client Errors
export class BadRequestError extends HttpError {
  constructor(message: string = "Bad Request", details?: any) {
    super(400, "BAD_REQUEST", message, details)
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message: string = "Unauthorized", details?: any) {
    super(401, "UNAUTHORIZED", message, details)
  }
}

export class ForbiddenError extends HttpError {
  constructor(message: string = "Forbidden", details?: any) {
    super(403, "FORBIDDEN", message, details)
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string = "Resource Not Found", details?: any) {
    super(404, "NOT_FOUND", message, details)
  }
}

export class ConflictError extends HttpError {
  constructor(message: string = "Conflict", details?: any) {
    super(409, "CONFLICT", message, details)
  }
}

export class UnprocessableEntityError extends HttpError {
  constructor(message: string = "Unprocessable Entity", details?: any) {
    super(422, "UNPROCESSABLE_ENTITY", message, details)
  }
}

export class TooManyRequestsError extends HttpError {
  constructor(message: string = "Too Many Requests", details?: any) {
    super(429, "TOO_MANY_REQUESTS", message, details)
  }
}

// 5xx Server Errors
export class InternalServerError extends HttpError {
  constructor(message: string = "Internal Server Error", details?: any) {
    super(500, "INTERNAL_SERVER_ERROR", message, details)
  }
}

export class ServiceUnavailableError extends HttpError {
  constructor(message: string = "Service Unavailable", details?: any) {
    super(503, "SERVICE_UNAVAILABLE", message, details)
  }
}

export class BadGatewayError extends HttpError {
  constructor(message: string = "Bad Gateway", details?: any) {
    super(502, "BAD_GATEWAY", message, details)
  }
}

export const SetupOnErorr = (error: unknown, set: Context["set"]) => {
  if (error instanceof HttpError) {
    set.status = error.statusCode
    return {
      success: false,
      error: error.errorCode,
      message: error.message,
      ...(error.details && { details: error.details }),
    }
  }

  set.status = 500
  return {
    success: false,
    error: "INTERNAL_SERVER_ERROR",
    message: "Internal Server Error",
  }
}
