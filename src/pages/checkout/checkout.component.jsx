import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import { selectCartItems, selectCartTotal } from "../../redux/cart/cart.selectors";

import './checkout.style.scss';

const CheckoutPage = ({total, cartItems}) => (
    <div className='checkout-page'>
        <div className='checkout-header'>
            <div className='header-block'>
                <span className=''>Product</span>
            </div>
            <div className='header-block'>
                <span className=''>Description</span>
            </div>
            <div className='header-block'>
                <span className=''>Quantity</span>
            </div>
            <div className='header-block'>
                <span className=''>Price</span>
            </div>
            <div className='header-block'>
                <span className=''>Remove</span>
            </div>
        </div>
        {
            cartItems.map(cartItem => (<CheckoutItem key={cartItem.id} cartItem={cartItem} />))
        }
        <div className='total'>
            <span>TOAL: ${total}</span>
        </div>
    </div>
);


const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
})
export default connect(mapStateToProps)(CheckoutPage);