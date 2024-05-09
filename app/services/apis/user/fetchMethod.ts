

const headers = {
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
    headers: {
      'Content-Type': 'application/json'
    }
}
export const loginApi = async(formVal:any|{}) => {
    try {
      const response = await fetch(`${apiUrl}${apiRoutes.loginUser}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: formVal,
      });
  
       // Check if the response is successful
       if (!response.ok) {
        
        const errData = await response.json();
        console.log("loginApi error",errData)
        return errData;
        throw new Error('Login failed');
      }
  
      // Assuming the response is JSON
      const responseData = await response.json();
  
      return responseData;
      
    } catch (error) {
          console.log("error",error);
          throw new Error('loginApi func failed');
    }
  }