import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {withRouter} from 'react-router-dom';

import { selectCartItems } from "../../redux/cart/cart.selectors";
import { toggleCartHidden } from "../../redux/cart/cart.action";
import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";

import './cart-dropdown.style.scss';

const CartDropdown = ({cartItems, history, dispatch}) => (
    <div className='cart-dropdown'>
        <div className='cart-items' >
            {
                cartItems.length?
                (cartItems.map(cartItem => <CartItem key={cartItem.key} item={cartItem}/>))
                :(<span className='empty-message'>Your cart is empty</span>)
            }
        </div>
        <CustomButton onClick={() => {history.push('/checkout'); dispatch(toggleCartHidden())}}>Go TO CHECKOUT</CustomButton>
    </div>
)

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
})

export default withRouter(connect(mapStateToProps)(CartDropdown));