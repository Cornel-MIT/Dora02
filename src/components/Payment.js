import React from 'react';
import '../components/styles/Payment.css'; 

const Payment = () => {
  return (
    <div className="modal">
      <form className="form">
        <div className="credit-card-info--form">
          <div className="input_container">
            <label className="input_label" htmlFor="cardholder-name">
              Card holder full name
            </label>
            <input
              placeholder="Enter your full name"
              title="Cardholder's full name"
              name="cardholder-name"
              type="text"
              className="input_field"
              id="cardholder-name"
              required
            />
          </div>

          <div className="input_container">
            <label className="input_label" htmlFor="card-number">
              Card Number
            </label>
            <input
              placeholder="0000 0000 0000 0000"
              title="Card Number"
              name="card-number"
              type="number"
              className="input_field"
              id="card-number"
              required
            />
          </div>

          <div className="input_container">
            <label className="input_label" htmlFor="expiry-cvc">
              Expiry Date / CVV
            </label>
            <div className="split">
              <input
                placeholder="01/23"
                title="Expiry Date"
                name="expiry-date"
                type="text"
                className="input_field"
                id="expiry-date"
                required
              />
              <input
                placeholder="CVV"
                title="CVV"
                name="cvv"
                type="number"
                className="input_field"
                id="cvv"
                required
              />
            </div>
          </div>

          <button className="purchase--btn" type="submit">
            Checkout
          </button>

          <div className="separator">
            <hr className="line" />
            <p>or pay using e-wallet</p>
            <hr className="line" />
          </div>

          <div className="payment--options">
            <button type="button" name="paypal">
              <span>PayPal</span>
            </button>
            <button type="button" name="apple-pay">
              <span>Apple Pay</span>
            </button>
            <button type="button" name="google-pay">
              <span>Google Pay</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Payment;
