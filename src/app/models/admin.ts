export class Admin {

    adminId: number | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    username: string | undefined;
    password: string | undefined;

    constructor(adminId?: number, firstName?: string, lastName?: string, username?: string, password?: string) {
        this.adminId = adminId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
    }
}
