export class JwtDataAdministratorDto {
    administratorId: number;
    username: string;
    expire: number;
    ip: string;
    ua: string;

    toPlainObject() {
        return{
        administratorId: this.administratorId,
        username: this.username,
        expire: this.expire,
        ip: this.ip,
        ua: this.ua
    }
    }
}