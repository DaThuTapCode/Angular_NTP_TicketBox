export class ResponseError {
    timestamp: Date;
    status: number;
    path: string;
    error: string; 
    message: string;


    constructor(data:any){
        this.timestamp = data.timestamp;
        this.status = data.status;
        this. path = data.path;
        this. error = data.error;
        this.message = data.message;
    
    }
}
