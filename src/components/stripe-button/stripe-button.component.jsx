import React from 'react';
import StripeCheckout from 'react-stripe-checkout';


const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price*100;
    const publishableKey = 'pk_test_51JsBxcSCcQUlAlaH0UkswMLZtVru6V7DnvXmUQHdYIDupead5OXpY4waHSdnBCZJrn6bXiEU4mRbx91MRTks7jqb003K4HIvcS';

    const onToken  = token => {
        console.log(token);
        alert("Payment Successful");
    }
    return (
        <StripeCheckout 
            label = 'Pay Now'
            name='CRWN CLOTHING Ltd.'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your Total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey = {publishableKey}
        />
    )
};

export default StripeCheckoutButton;

