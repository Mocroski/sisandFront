export class UserInputDto {
    userName: string;
    password: string;
    name: string;
    email:string;

    constructor(
        userName: string,
        password: string,
        name:string,
        email:string
    ) {
        this.userName = userName;
        this.password = password;
        this.name = name;
        this.email = email;
    }
}

export class UserOutputDto {
    id: number;
    userName: string;
    email:string;
    constructor(
        id: number,
        userName: string,
        name:string,
        email:string
    ) {
        this.id = id;
        this.userName = userName;
        this.email = email;
    }
}