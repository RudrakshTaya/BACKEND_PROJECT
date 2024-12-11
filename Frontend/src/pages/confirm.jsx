import React from 'react';
import { useLocation } from 'react-router-dom';

function ConfirmationPage() {
  const location = useLocation();
  const { orderId } = location.state || {};

  return (
    <div>
      <h1>Order Confirmation</h1>
      <p>Your order has been placed successfully!</p>
      {orderId && <p>Your Order ID is: {orderId}</p>}
    </div>
  );
}

export default ConfirmationPage;
