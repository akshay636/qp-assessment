export class HttpBadRequest extends Error {
    constructor(message: string) {
        super(message);
        this.name = "HttpBadRequest";
    }
}
