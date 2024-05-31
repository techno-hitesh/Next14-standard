import  * as Yup from "yup"



export const resetpasswordSchema=Yup.object({
  oldPassword:Yup.string().required('Password is required')
  .min(8, 'Password must be at least 8 characters long')
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^+-]).{8,}$/,
    'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character (#?!@$%^&*-)'
  ),
  newPassword:Yup.string().required('Password is required')
  .min(8, 'Password must be at least 8 characters long')
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^+-]).{8,}$/,
    'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character (#?!@$%^&*-)'
  ),
  confirmPassword:Yup.string().required("Confirm password please") .nullable().oneOf([Yup.ref("newPassword"),null],"Password must match")
})

export  const categoryschema=Yup.object({
    categoryName:Yup.string().matches(/^[^\d]+$/, "Invalid Category name").max(30).required("Enter category name"),
    categoryDescription:Yup.string().matches(/^[^\d]+$/, "Invalid Description").max(40).required("Enter description"),
    categoryImg:Yup.string().required("Image is requried")
})
export const subcategoryschema = Yup.object({
    categoryName: Yup.string().required("Select a category first"),
    subCategoryName: Yup.string()
      .matches(/^[^\d]+$/, "Invalid Subcategory name")
      .max(30)
      .required("Please enter subcategory name"),
    subCategoryDescription: Yup.string()
      .matches(/^[^\d]+$/, " Invalid Description ")
      .max(40)
      .required("Please enter the description"),
    subCategoryImg: Yup.string().required("Image is required"),
  });