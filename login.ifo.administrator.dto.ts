
export class LoginIfoAdministratorDto {
    administratorId: number;
    username: string;
    token: string;

    constructor (administratorId: number, username: string, token: string) {
        this.administratorId = administratorId;
        this.username = username;
        this.token = token;
    }
}