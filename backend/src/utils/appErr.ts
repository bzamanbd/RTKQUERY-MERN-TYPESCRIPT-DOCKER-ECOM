interface HttpError extends Error{ 
    status?:string,
    statusCode?:number
}

const appErr = (message:string,statusCode:number)=>{ 
    let error:HttpError = new Error(message)
    error.statusCode = statusCode || 500
    error.stack = error.stack
    return error
}

export default appErr