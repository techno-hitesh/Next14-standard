import { GetProductByIdAPI, adminUpdateProductApi } from '@/app/services/apis/admin/products'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

const UpdateModal = ({ id, onUpdateSuccess }: { id: { id: any | string }, onUpdateSuccess: () => void }) => {
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [pending,setpending]=useState(false)
  const [productBrand, setproductBrand] = useState('');
  const [productShortDescription, setShortDescription] = useState('');
  const [productFeature, setFeature] = useState('');
  const [quan, setQuan] = useState("")
  const [productImages, setProductImages] = useState<File[]>([])

  const getProductById = async () => {
    const response = await GetProductByIdAPI(id)
    if (response?.status === 200) {
      setName(response?.getProduct?.productName || "")
      setDescription(response?.getProduct?.productDescription || "")
      setPrice(response?.getProduct?.productPrice || "")
      setproductBrand(response?.getProduct?.productBrand || "")
      setShortDescription(response?.getProduct?.productShortDescription || "")
      setFeature(response?.getProduct?.productFeature || "")
      setQuan(response?.getProduct?.productStockQuantity || "")
      setProductImages(response?.getProduct?.productImg || [])
    } else {
      toast.error(response?.message)
    }
  }

  const handleImgUpdate = (e: any) => {
    const files: any = Array.from(e.target.files);
    setProductImages(files);
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setpending(true)
    const data = new FormData();

    if (name) data.append('productName', name);
    if (price) data.append('productPrice', price);
    if (description) data.append('productDescription', description);
    if (productBrand) data.append('productBrand', productBrand);
    if (productShortDescription) data.append('productShortDescription', productShortDescription);
    if (productFeature) data.append('productFeature', productFeature);
    if (quan) data.append('productStockQuantity', quan);

    productImages.forEach((img) => {
      data.append('productImg', img);
    });

    const response = await adminUpdateProductApi(id, data)
    if (response?.status === 200) {
      toast.success('Product updated successfully!')
      setShowModal(false)
      setpending(false)
      onUpdateSuccess()
      router.push(`/admin/products/${id}`)
    } else {
      toast.error('Update failed!')
    }
  }

  useEffect(() => {
    getProductById()
  }, [])






return (
    <>
      {/* Modal toggle */}
      <div className="flex justify-center">
        <button
          id="updateButton"
          data-modal-target="updateModal"
          data-modal-toggle="updateModal"
          className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Update
        </button>
      </div>

      {/* Main modal */}
      {showModal && (
        <div
          id="updateModal"
          aria-hidden="true"
          className="overflow-y-auto overflow-x-hidden fixed bg-gray-200 bg-opacity-30 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full"
        >
          <div className="relative left-[40%] top-[10%] p-4 max-w-md h-full md:h-auto">
            {/* Modal content */}
            <div className="relative p-4 bg-white text-center w-[130%] rounded-lg shadow dark:bg-gray-800 sm:p-5">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="updateModal"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div>
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Product Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Type product name"
                      />
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Description
                      </label>
                      <input
                        type="text"
                        name="description"
                        id="description"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Product Description"
                      />
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="price"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Price
                      </label>
                      <input
                        type="number"
                        name="price"
                        id="price"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="₹299"
                      />
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="quan"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Quantity
                      </label>
                      <input
                        type="number"
                        min={1}
                        name="quan"
                        id="quan"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        value={quan}
                        onChange={(e) => setQuan(e.target.value)}
                        placeholder="Enter Quantity"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="productBrand"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Product brand
                      </label>
                      <input
                        type="text"
                        name="productBrand"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        value={productBrand}
                        onChange={(e) => setproductBrand(e.target.value)}
                        placeholder="Type product brand"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="productShortDescription"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Product Name
                      </label>
                      <input
                        type="text"
                        name="productShortDescription"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        value={productShortDescription}
                        onChange={(e) => setShortDescription(e.target.value)}
                        placeholder="Type product ShortDescription"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="productFeature"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Product feature
                      </label>
                      <input
                        type="text"
                        name="productFeature"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        value={productFeature}
                        onChange={(e) => setFeature(e.target.value)}
                        placeholder="Type product feature"
                      />
                    </div>

                    <div>
                      <label htmlFor="productImg" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Product Image
                      </label>
                      <input
                        type="file"
                        id="productImg"
                        placeholder="Image"
                        multiple
                        onChange={handleImgUpdate}
                      />
                    </div>
                  </div>
                  <div className="flex justify-center items-center space-x-4">
                    <button
                      onClick={() => setShowModal(false)}
                      data-modal-toggle="updateModal"
                      type="button"
                      className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:ring-4 focus:outline-none focus:ring-primary-300 focus:ring-primary-900 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="py-2 px-3 text-sm font-medium w-[20%] flex justify-center items-center text-center bg-black text-white bg-primary-700 rounded-lg focus:ring-4 focus:outline-none focus:ring-primary-300 focus:ring-primary-900 hover:bg-primary-800"
                    >
                      {pending ? 
                       <svg aria-hidden="true" className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                       <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                   </svg>
                     : "Update"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  )
}

export default UpdateModal