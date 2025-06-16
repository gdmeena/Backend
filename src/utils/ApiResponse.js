class ApiResponse {
    constructor(status,data,message = 'Success'){
        this.status = status;
        this.data = data;
        this.message = message;
        this.success = statuscode < 400;
    }
}

export default ApiResponse;