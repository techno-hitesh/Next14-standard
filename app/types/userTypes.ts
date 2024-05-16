export type UserType = {
    email : string;
    password : string|number;
}

export type UserForgotType = {
    email : string;
}

export type UserResetType = {
    email : string;
    otp:number|string;
    newPassword:number|string;
    confirmPassword:number|string;
}

export type UserDataType = {
    email: string;
    fullName: string;
    _id:string;
    role:{
        role:string;
        _id:string;
    }
};
  

export type TokenType = {
    token : string
}
  

export type RegisterType ={
    fullName:string;
    email:string;
    password: string;
    confirmPassword:string;
}

export type NavbarUserType={
    id:string,
    link:string,
    name:string
}

export type ProductType ={
    _id: string;
    productName: string;
    productPrice: number;
    productImg: string;
    productDescription: string;
}

export type ProductTypeProps={
    data:{
        products: ProductType[],
        currentPage:number,
        totalCount:number,
        totalPages:number,
    }
}

export type addToCartType = {
    productId:string,
    productName:string
}

export type updateCartItemType = {
    productId:string,
    productName:string
    quantity:number
}

export type addressType = {
    mobileNumber?:number,
    country:string
    state:string
    city:string
    streetAddress:string
    nearByAddress:string
    areaPincode?:number
}