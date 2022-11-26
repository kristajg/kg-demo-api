class Response{
    constructor(){

    }

    /**
     * Default response
     */
    _defaultResponse(){
        const response = new Twilio.Response();
        response.appendHeader("Access-Control-Allow-Origin", "*");
        response.appendHeader("Access-Control-Allow-Headers", "PUT, POST, GET, OPTIONS, DELETE");
        response.appendHeader("Access-Control-Allow-Headers", "Content-Type");
        response.appendHeader("Content-Type", "application/json");
        return response;
    }
    /**
     * 
     * @param {any} body 
     * @returns Successful 200 response
     */
    okResponse(body){
        const response = this._defaultResponse();
        response.setStatusCode(200);
        response.setBody(body);
        return response;
    }

    /**
     * Bad request response
     * @param {any}
     * @returns Bad Request 400 response
     */
    badRequestResponse(body){
        const response = this._defaultResponse();
        response.setStatusCode(400);
        response.setBody(body);
        return response;
    }
}

module.exports = Response;