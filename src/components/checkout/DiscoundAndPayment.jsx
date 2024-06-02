import React from 'react';

const DiscountAndPayment = ({checkoutInfo}) => {

    return (
        <div className="p-4 bg-white shadow-lg max-w-sm">
            <div className="mb-4">
                <h2 className="text-lg font-bold">Payment Info:</h2>
            </div>

            <div className="mb-4 border-t pt-4">
                <h3>Order Summary</h3>
                <div className="flex justify-between mt-2">
                    <span>Items Total</span><span>Rs. {checkoutInfo.totalPrice}</span>
                </div>
                <div className="flex justify-between mt-2">
                    <span>Delivery Fee</span><span>Rs. {checkoutInfo.totalDeliveryFee}</span>
                </div>

                {/* Add more details as needed */}

            </div>

            {/* Total Payment Section */}
            {/* Place Order Button */}
        </div>
    );
};

export default DiscountAndPayment;
