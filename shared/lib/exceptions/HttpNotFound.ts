export class HttpNotFound extends Error {
    constructor(message: string) {
        super(message);
        this.name = "HttpNotFound";
    }
}
