"use client"
import React,{useState,useEffect} from 'react'
import "./style.css";

const InvoicePage = () => {

    const [date, setDate] = useState('');

    // Function to update the date
    useEffect(() => {
        // Get the current date
        const currentDate = new Date();
        // Format the date as desired (for example, "May 14, 2024")
        const formattedDate = currentDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        });
        // Update the state with the formatted date
        setDate(formattedDate);
    }, []);


  return (
    <> 

<div className="bodys">
  <div className="invoice-container">
    <div className="invoice-header">
      <h1 className="invoice-title" style={{ textAlign: 'end' }}>Invoice</h1>
    </div>

    <div className="container">
    <div className="billing-information">
        <h1 style={{'fontFamily':'auto'}}>BILLED TO</h1>
        <p>Samira Hadid</p>
        <p>123 Anywhere St., Any City, ST 12345</p>
        <p>(555) 555-5555</p>
    </div>

    <div className="billing-informations">
        <h1 style={{'fontFamily':'auto'}}>Invoice NO 123</h1>
        <p>{date}</p>
    </div>

    </div>
   

    <div className="invoice-details">
      <table className="table-start">
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Eggshell Camisole Top</td>
            <td>1</td>
            <td>$123.00</td>
            <td>$123.00</td>
          </tr>
          <tr>
            <td>Cuban Collar Shirt</td>
            <td>2</td>
            <td>$127.00</td>
            <td>$254.00</td>
          </tr>
          <tr>
            <td>Floral Cotton Dress</td>
            <td>1</td>
            <td>$129.00</td>
            <td>$129.00</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div className="invoice-summary">
      <table>
        <tbody>
          <tr>
            <th>Subtotal</th>
            <td>$500.00</td>
          </tr>
          <tr>
            <th>Tax (0%)</th>
            <td>$0.00</td>
          </tr>
          <tr>
            <th>Total</th>
            <td>$500.00</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div className="container mt-5">
    <div className="payment-information">
      <p className="payment-instructions">Payment Information:</p>
      <p>Payment Method : Card</p>
      <p>Pay By : {date}</p>
    </div>

    <div className="payment-information">
      <p className="payment-instructions">Users Name</p>
      <p>1231 Street , model town</p>
    </div>


    </div>

  </div>
</div>


       		{/* <div className="invoice-box">
			<table cellpadding="0" cellspacing="0">
				<tr className="top">
					<td colspan="2">
						<table>
							<tr>
								<td className="title">
									<img
										src="https://sparksuite.github.io/simple-html-invoice-template/images/logo.png"
                                        style={{ width: '100%', maxWidth: '300px' }}
									/>
								</td>

								<td>
									Invoice #: 123<br />
									Created: January 1, 2023<br />
									Due: February 1, 2023
								</td>
							</tr>
						</table>
					</td>
				</tr>

				<tr className="information">
					<td colspan="2">
						<table>
							<tr>
								<td>
									Sparksuite, Inc.<br />
									12345 Sunny Road<br />
									Sunnyville, CA 12345
								</td>

								<td>
									Acme Corp.<br />
									John Doe<br />
									john@example.com
								</td>
							</tr>
						</table>
					</td>
				</tr>

				<tr className="heading">
					<td>Payment Method</td>

					<td>Check #</td>
				</tr>

				<tr className="details">
					<td>Check</td>

					<td>1000</td>
				</tr>

				<tr className="heading">
					<td>Item</td>

					<td>Price</td>
				</tr>

				<tr className="item">
					<td>Website design</td>

					<td>$300.00</td>
				</tr>

				<tr className="item">
					<td>Hosting (3 months)</td>

					<td>$75.00</td>
				</tr>

				<tr className="item last">
					<td>Domain name (1 year)</td>

					<td>$10.00</td>
				</tr>

				<tr className="total">
					<td></td>

					<td>Total: $385.00</td>
				</tr>
			</table>
		</div> */}


    </>
  )
}

export default InvoicePage;
