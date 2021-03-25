export class ApiResponse {
    error: string;
    status: number;
    messages: string | null;

    constructor(error: string, status: number, messages: string | null = null) {
        this.error = error;
        this.status = status;
        this.messages = messages;
    }
}