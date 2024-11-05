import React from 'react';

const Payment = () => {
  return (
    <div className="payment">
      <h2>Payment Page</h2>
      <p>Complete your purchase by entering payment information.</p>
      <form>
        <label>Card Number:</label>
        <input type="text" placeholder="Enter card number" required />
        <label>Expiration Date:</label>
        <input type="text" placeholder="MM/YY" required />
        <label>CVC:</label>
        <input type="text" placeholder="CVC" required />
        <button type="submit">Submit Payment</button>
      </form>
    </div>
  );
};

export default Payment;
