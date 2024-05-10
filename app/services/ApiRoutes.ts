export const apiRoutes = {
    userLogin: '/login/user-login',
    logout: '/logout',
    getUsers: '/user/get-user',
    registerUser:'/user/register',
}

export const adminRoutes = {
    adminUsers: '/admin/get-admin',
    getAdminUser: '/admin/users',
    getAllProducts:'/admin/get-all-products',
    getProductById:"/admin/get-product/",
    
}

export const cartRoutes = {
    addToCart:"/user/add-to-cart",
    getAllCart: "/user/get-cart",
    getItemCart:"/user/get-cart-item/",
    updateItemCart:"/user/update-cart-item/",
    removeCartItem:"/user/delete-cart-item/",
    removeCartQuantity:"user/remove-cart-item/"
}

export const payments = {
    createPayment:"/user/process-payments"
}