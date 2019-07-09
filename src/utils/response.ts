import * as httpStatus from 'http-status';

class Response {
    defaultResponse(res, data, statusCode = httpStatus.OK) {
      res.status(statusCode).json(data);
    }
    
    errorResponse(res, errorData, statusCode = httpStatus.BAD_REQUEST) {
      this.defaultResponse(res, errorData, statusCode);
    }
}

export default new Response();
