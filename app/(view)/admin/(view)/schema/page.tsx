import  * as Yup from "yup"

export  const categoryschema=Yup.object({
    categoryName:Yup.string().max(30).required("Enter category name"),
    categoryDescription:Yup.string().max(40).required("Enter description")
})
export  const subcategoryschema=Yup.object({
    categoryName:Yup.string().required("Select a catergory first"),
    subCategoryName:Yup.string().max(30).required("Please enter subcategory name"),
    subCategoryDescription:Yup.string().max(40).required("Please enter the descritpion ")
  
  })