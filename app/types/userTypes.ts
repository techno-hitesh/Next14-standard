export type UserType = {
    email : string;
    password : string|number;
}

export type TokenType = {
    token : string
}
  

export type RegisterType ={
    fullName:string;
    email:string;
    password: string;
    confirmPassword:string;
}