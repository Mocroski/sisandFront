export class LoginInputDto{
    userName: string;
    password: string;

    constructor(userName: string, password:string){
        this.userName = userName;
        this.password = password;
    }
}

export class ResponseSignIn {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;

    constructor(accessToken:string, refreshToken:string, expiresIn:number){
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.expiresIn = expiresIn;
    }
  }