const Response = () => {
    /**
     * Default response
     */
    const defaultResponse = () => {
        const response = new Twilio.Response();
        response.appendHeader("Access-Control-Allow-Origin", "*");
        response.appendHeader("Access-Control-Allow-Headers", "PUT, POST, GET, OPTIONS, DELETE");
        response.appendHeader("Access-Control-Allow-Headers", "Content-Type");
        response.appendHeader("Content-Type", "application/json");
        return response;
    }

    const okResponse = (body) => {
        const response = defaultResponse();
        response.setStatusCode(200);
        response.setBody(body);
        return response;
    }

    /**
     * Bad request response
     * @param {any}
     */
    const badRequestResponse = (body) => {
        const response = defaultResponse();
        response.setStatusCode(400);
        response.setBody(body);
        return response;
    }

    return {
        okResponse,
        badRequestResponse,
    }
}

module.exports = Response();