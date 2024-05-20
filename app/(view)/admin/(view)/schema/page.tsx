import  * as Yup from "yup"

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