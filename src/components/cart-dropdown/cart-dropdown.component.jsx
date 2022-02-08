import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {withRouter} from 'react-router-dom';

import { selectCartItems } from "../../redux/cart/cart.selectors";
import { toggleCartHidden } from "../../redux/cart/cart.action";
import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";

import { CartDropdownContainer, CartItemsContainer, EmptySpan } from "./cart-dropdown.style";

const CartDropdown = ({cartItems, history, dispatch}) => (
    <CartDropdownContainer>
        <CartItemsContainer>
            {
                cartItems.length?
                (cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem}/>))
                :(<EmptySpan>Your cart is empty</EmptySpan>)
            }
        </CartItemsContainer>
        <CustomButton onClick={() => {history.push('/checkout'); dispatch(toggleCartHidden())}}>Go TO CHECKOUT</CustomButton>
    </CartDropdownContainer>
)

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
})

export default withRouter(connect(mapStateToProps)(CartDropdown));