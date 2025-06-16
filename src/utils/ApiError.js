class ApiError extends Error{
    constructor(
        statusCode,
        message = 'Something went Error',
        error = [],
    stack =""
    ){
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.error = error;
        

        if(this.stack){
            this.stack = stack;
    }else{
        Error.captureStackTrace(this, this.constructor);
    }
}
}

export { ApiError };