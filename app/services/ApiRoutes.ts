export const apiRoutes = {
    userLogin: '/login/user-login',
    logout: '/logout',
    getUsers: '/user/get-user',
    registerUser:'/user/register',
    forgotUser:"/user/forget-password",
    resetPass:"/user/reset-password"
}

export const adminRoutes = {
    adminUsers: '/admin/get-admin',
    getAdminUser: '/admin/users',
    getAllProducts:'/admin/get-all-products',
    getProductById:"/admin/get-product/",
    deleteProductById:"admin/delete-product/",
    getallcategories:"/admin/get-all-categories",
    getcategory:"/admin/get-category/",
    
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
    createPayment:"/user/process-payment",
    getAllPaymentDetails:"/user/get-payment-details",
    getPaymentsById:"/user/get-payment/",
    getpdf:"/user/download-pdf/"
}