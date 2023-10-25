class OperationalError extends Error{
    constructor(message, statusCode){

        //Set custom error message, status, status code, isOperational
        super(message)
        this.statusCode=statusCode
        this.status=`${statusCode}`.startsWith("4")? 'fail' : 'error'
        this.isOperational=true

        //Set capture error stack
        Error.captureStackTrace(this,this.constructor)
    }
} 
module.exports=OperationalError 