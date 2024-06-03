export const apiRoutes = {
    userLogin: '/login/user-login',
    logout: '/logout',
    getUsers: '/user/get-user',
    registerUser:'/user/register',
    forgotUser:"/user/forget-password",
    resetPass:"/user/reset-password",
    logoutUser:'/login/user-logout',
    wishlistUser:'/user/add-to-wishlist',
    getuserWishlist:'/user/get-user-wishlist',
    deleteWishlist:'/user/remove-wishlist/',
    getAllReview:'/user/get-all-reviews/',
    addReview:'/user/submit-review/'
}

export const adminRoutes = {
    adminUsers: '/admin/get-admin',
    getAdminUser: '/admin/users',
    updateProfileAdmin:'/user/update-profile',
    getallUsers:'/admin/get-all-users',
    resetpasswordAdmin:'/user/change-password',
    getAllProducts:'/admin/get-all-products',
    getProductById:"/admin/get-product/",
    deleteProductById:"admin/delete-product/",
    deleteCategoryById:"/admin/delete-category/",
    deletesubcategoryById:'/admin/delete-sub-category/',
    getallcategories:"/admin/get-all-categories",
    getcategory:"/admin/get-category/",
    getsubcategorybyId:'/admin/get-sub-category/',
    getallsubcategories:"/admin/get-all-sub-categories",
    adminUpdateProduct:"/admin/update-product/",
    adminUpdateCategoryAPi:"/admin/update-category/",
    adminUpdateSubCategoryAPi:"/admin/update-sub-category/",
    createcategory:"/admin/create-category",
    createsubcategory:"/admin/create-sub-category",
    createproduct:"/admin/create-product",
    getproductBySearch:"/admin/get-all-products?searchQuery="
    
}

export const charts={
    revenueApi:"/admin/get-total-revenue",
    AllPayment:"/admin/get-all-payments"
}

export const categories = {
    getAllCategory  : "/user/get-categories",
    getCategoryById : "/user/get-categories/",
    getSubCategoryById  : "/user/get-sub-categories/"
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

export const address = {
    createAddress:"/user/add-address",
    getAllAddress:"/user/get-address",
    getAddressById:"/user/get-address/",
    delAddressById:"/user/delete-address/",
    updateAddress:"/user/update-address/"
}