"use client"
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/navigation';

const TableCompo = (orderData:any) => {

    const route = useRouter()
    const tableData = orderData.orderData

    const handleView = (id:string) =>{
        console.log("hanlde view",id)
        route.replace("/dashboard/order/"+id)
    }

  return (
    <>
    <table className="table caption-top">
  <caption>List of Orders</caption>
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Product Name</th>
      <th scope="col">Product Price</th>
      <th scope="col">Product Quantity</th>
      <th scope="col">PaymentStatus</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
  {tableData && tableData !== "" ? (
        tableData.map((dm:any, i:any) => (
            <tr key={i}>
            <th scope="row">{i+1}</th>
            <td>{dm.totalProduct[0]?.productName}</td>
            <td>{dm.totalProduct[0]?.productPrice}</td>
            <td>{dm.totalProduct[0]?.productQuantity}</td>
            <td>{dm.paymentStatus}</td>
            <td><Button variant="outline-primary" type="submit" onClick={()=>handleView(dm._id)}>View</Button></td>
            </tr>
        ))
        ) : (
        <tr>
            <td >Please wait....</td>
        </tr>
        )}

  </tbody>
</table>
      
    </>
  )
}

export default TableCompo
